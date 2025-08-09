const sqlite3 = require("sqlite3").verbose()


const db = new sqlite3.Database("./voitures.db",(error)=>{
    if(error){
        console.log(error.message)
    }else {
       
    }
})


db.run(`CREATE TABLE IF NOT EXISTS voitures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marque TEXT NOT NULL,
  modele TEXT NOT NULL,
  annee INTEGER,
  prix INTEGER,
  boite TEXTE,
  carburant TEXTE,
  minimum_kilometrage INTEGER,
  maximum_kilometrage INTEGER
)`);

module.exports = db