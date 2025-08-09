const fs = require('fs')
/*
const file = fs.readFileSync("plateforme/fusion.json",{encoding : "utf-8"})

const data  = JSON.parse(file)


let voitures_avec_prix = data.filter(voiture=>{
    return voiture.prix !==null  && voiture.prix !==undefined && voiture.prix>10000 && 
    voiture.prix !== "" && voiture.kilometrage !=="" && voiture.kilometrage !==null &&
    voiture.kilometrage !==undefined
})


const kilometrage_standard = "400 000 - 449 900".replaceAll(' ','').split('-')


let i = 0
voitures_avec_prix.forEach(voiture => {
    
    let kilometrage = voiture['kilometrage']
    kilometrage = kilometrage.replaceAll(' ','').split('-')

    try{
        voiture['minimum_kilometrage'] = Math.floor((parseInt(kilometrage[0]))/50000)*50000
        voiture['maximum_kilometrage'] = Math.floor((parseInt(kilometrage[0]))/50000)*50000 +50000
        voiture['année'] = parseInt(voiture['année'])
    }catch{
      {

      console.log(voiture['année'])
    };
    }

    if(isNaN(voiture.minimum_kilometrage)){
         voiture.minimum_kilometrage= 500000 
            voiture.maximum_kilometrage = 600000
    }
     
    

    
});


fs.writeFileSync('data.json',JSON.stringify(voitures_avec_prix,null,2),"utf-8")

*/





