const db = require("./db");

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

const data = ['Audi', 'A7','2017']
async function tester() {
    const da = await getPrix(data, "SELECT prix FROM voitures WHERE marque = ? AND modele = ? AND annee = ?")
    console.log(da)
}

tester()