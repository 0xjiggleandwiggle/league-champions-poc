const { Router } = require('express');
var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var championScraper = require("../scraper/champions");

// Models import
const db = require("../models")

/** Global variables */
var filepath = path.join(__dirname, "../data", "data.json")


/* GET champions list. */
router.get('/champions/all', (req, res, next) => {
  db.Champion.findAll().then(champions => {
    if(champions.length > 0){
      res.status(200).json(champions);
    }else{
      res.status(200).json([])
    }
  }).catch(err=>{
    next(err)
  })
});

/* POST add an new champions */
router.post("/champions/add",async (req,res,next) => {
  let champ_data;
  // receive info
  let {name, picture, scrap_url} = req.body;

  // scrap data
  try{
    champ_data = await championScraper(scrap_url);
  }catch(e){
    next(e);
  }

  // create champion MYSQL instance
  const new_champion = db.Champion.build({
    name: name,
    picture: picture,
    data: champ_data.data
  });

  // save the champion to MYSQL
  new_champion.save()
    .then(added => {
      res.status(201)
        .send("ADDED")
    })
    .catch(err => {
      throw err;
    });

});

/** DELETE DELETE ONE CHAMPIONS */
router.delete("/champions/delete/:id", async (req, res, next) =>{
  const {id} = req.params;
  try{
    const champion = await db.Champion.findOne({
      where: {id}
    });
    await champion.destroy();
    res.status(200)
      .send("DELETED")
  }
  catch(err){
    throw err;
  }

});

/** GET List champions from json file */
router.get('/champions/json/all', function(req, res, next) {
  try{
    var rawdata = fs.readFileSync(filepath);
    var data = JSON.parse(rawdata);
    res.status(200).json(data);
  }
catch(e){
  next(e);
}
});

/** POST Add new champions in json file */
router.post('/champions/json/add', async function(req, res, next) {
  let champ_data;
  try{
    var rawdata = fs.readFileSync(filepath);
    var fdata = JSON.parse(rawdata);
    // receive info
    let {name, picture, scrap_url} = req.body;

    // scrap data
    try{
      champ_data = await championScraper(scrap_url);
    }catch(e){
      next(e);
    }

    fdata.push({
      name, picture, data: champ_data.data
    });

    var new_data = JSON.stringify(fdata);
    fs.writeFileSync(filepath, new_data);
    res.status(200)
      .send("ADDED");
  }
  catch(e){
    next(e)
  }

});

/** DELETE remove a champion from json file */
router.delete("/champions/json/delete/:name",  (req, res, next) =>{
  try{
    var champ_name = req.params.name;
    var rawdata = fs.readFileSync(filepath);
    var fdata = JSON.parse(rawdata);
    const filtered_data = fdata.filter((champ) => champ.name.toLowerCase() !== champ_name.toLowerCase());
    const new_data = JSON.stringify(filtered_data);
    fs.writeFileSync(filepath, new_data);
    res.status(200)
      .send("DELETED")
  }catch(e){
    next(e);
  }
});



module.exports = router;
