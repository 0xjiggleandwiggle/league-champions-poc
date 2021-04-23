var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require("path");
var fs = require("fs");
var cors = require("cors");
var helmet = require("helmet");
var db = require("./models");
var indexRouter = require('./routes/index');
var {numberOfRecords, seedData} = require("./helpers/database")

var app = express();
var static_path = path.join(__dirname, 'public');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(static_path));
app.use(cors());
app.use(helmet());

// Initiate data.json file if it doesn't exists
var data_path = path.join(__dirname, "data", "data.json");
if(!fs.existsSync(data_path)){
    const data = [
        {
            name: 'Diana',
            picture: "https://preview.redd.it/c8brh9xcu8161.png?auto=webp&s=01ecb82b619f12796c9c1ec4efe9a1dea0207ebe",
            data: {
              release_date: "2012-08-07",
              class: ["Assassin", "Diver"],
              position: ["Middle"],
              Ressource: "Mana",
              range_type: "Melee",
              adaptive_type: "Magic"
            }
          },
          {
            name: 'Lux',
            picture: "https://preview.redd.it/zhatmcoo2qv21.png?width=323&format=png&auto=webp&s=1368742a493ca7eaab1904e83ded885b7aee3195",
            data: {
              release_date: "2010-10-19",
              class: ["Burst", "Artilery"],
              position: ["Middle", "Support"],
              Ressource: "Mana",
              range_type: "Ranged",
              adaptive_type: "Magic"
            }
          }
    ]
    fs.writeFileSync(data_path, JSON.stringify(data));
}


// check if database exist or create and seed data
db.sequelize.sync().then(async con => {
  try{
    //seeding data automatically
    let rowsCount = await numberOfRecords();
    if(rowsCount == 0){
      await seedData();
    }   
  }
  catch(err){
    console.error(err)
  }
});

// API end points
app.use('/api', indexRouter);

// Global express error handler
app.use((error, req, res, next) => {
    return res.status( error.statusCode || 500).json({ error: error.message.toString() });
  });

module.exports = app;
