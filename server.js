const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* =====================
   UTILITAIRES
===================== */

// Récupère les prix pour une voiture donnée
function getPrix(data,query) {
  const querys = {
    un : "SELECT prix FROM voitures WHERE marque = ? AND modele = ? AND annee = ?",
    deux : "SELECT prix FROM voitures WHERE marque = ? AND modele = ?"

  }
  return new Promise((resolve, reject) => {
    db.all(query,data,
      (err, rows) => {
        if (err) reject(err);
        else if (rows.length ===0 && data.length>2){
            resolve(getPrix(data.slice(0,2),querys.deux))
        }
        else resolve(rows);
      }
    );
  });
}

// Calcul de la médiane
function median(rows) {
  if(rows.length===1) {
    return rows[0].prix
  }
  const sorted = rows.sort((a, b) => a.prix - b.prix);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[mid].prix;
  } else {
    return (sorted[mid].prix + sorted[mid - 1].prix) / 2;
  }
}

// Calcul de la moyenne
function moyenne(rows) {
  if(rows.length===1) {
    return rows[0].prix
  }
  const somme = rows.reduce((acc, v) => acc + v.prix, 0);
  return Math.floor(somme / rows.length);
}

// Récupère les années disponibles pour un modèle donné
function getAnneesParModele(modele) {
  return new Promise((resolve, reject) => {
    db.all("SELECT annee FROM voitures WHERE modele = ?", [modele], (err, rows) => {
      if (err) reject(err);

      const annees = [...new Set(rows.map((r) => r.annee))];
      resolve({ [modele]: annees });
    });
  });
}

/* =====================
   ROUTES EXPRESS
===================== */



// Route estimation de prix
app.post("/estimation", async (req, res) => {
  try {
    const { marque, modele, annee } = req.body;
    const rows = await getPrix([marque,modele,annee],"SELECT prix FROM voitures WHERE marque = ? AND modele = ? AND annee = ?");

    console.log(rows)
    if (rows.length === 0) {
      return res.json({ code : 400 , message: "Aucune donnée trouvée", data: req.body });
    }

    res.json({
      code : 200,
      mediane: median(rows),
      moyenne: moyenne(rows),
    });

  } catch (err) {
    console.error("Erreur /estimation :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



// Route pour récupérer les années disponibles d’un modèle
app.post("/modele_annee", async (req, res) => {
  try {
    const data = await getAnneesParModele(req.body.modele);
    res.json(data);
  } catch (err) {
    console.error("Erreur /modele_annee :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Générer un dictionnaire marque → modèles et sauvegarder dans un JSON
db.all("SELECT marque, modele FROM voitures ORDER BY marque, modele", (err, rows) => {
  if (err) {
    return console.error("Erreur SQL :", err.message);
  }

  const dict = {};
  rows.forEach((row) => {
    if (!dict[row.marque]) dict[row.marque] = [];
    if (!dict[row.marque].includes(row.modele)) {
      dict[row.marque].push(row.modele);
    }
  });

  fs.writeFileSync("marque_modele.json", JSON.stringify(dict, null, 2), "utf-8");
  console.log("Fichier marque_modele.json généré ✅");
});

/* =====================
   LANCEMENT SERVEUR
===================== */
app.listen(3000, () => {
  console.log("Serveur lancé sur http://127.0.0.1:3000");
});
