let db = require("../models")

module.exports = {
    numberOfRecords: async() => {
        try{
            let numberOfRecords = await db.Champion.findAndCountAll();
            return numberOfRecords.count;
        }
        catch(err){
            console.log(err);
        }
    },
    seedData: async () => {
        try{
            await db.Champion.bulkCreate([
                {
                  name: 'Diana',
                  picture: "https://preview.redd.it/c8brh9xcu8161.png?auto=webp&s=01ecb82b619f12796c9c1ec4efe9a1dea0207ebe",
                  data: JSON.stringify({
                    release_date: "2012-08-07",
                    class: ["Assassin", "Diver"],
                    position: ["Middle"],
                    Ressource: "Mana",
                    range_type: "Melee",
                    adaptive_type: "Magic"
                    })
                  },
                  {
                    name: 'Lux',
                    picture: "https://preview.redd.it/zhatmcoo2qv21.png?width=323&format=png&auto=webp&s=1368742a493ca7eaab1904e83ded885b7aee3195",
                    data: JSON.stringify({
                      release_date: "2010-10-19",
                      class: ["Burst", "Artilery"],
                      position: ["Middle", "Support"],
                      Ressource: "Mana",
                      range_type: "Ranged",
                      adaptive_type: "Magic"
                    })
                  }
              ]);
        }
        catch(err){
            console.error(err)
        }
    }
}