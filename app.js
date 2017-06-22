
//Sequelize - constructive function
var Sequelize = require('sequelize');
//connection to the database
//paramaters - dbname, user, password
var connection = new Sequelize('demo_schema', 'zenyhoj', 'joe.bals0515', {
host: 'localhost',
dialect: 'mysql'
});

//creating Models
//connection.define - accepts two arguments ('modelname', {
//property: Sequelize.DataType
//});
var Article = connection.define('article', {

//custom primaryKey
  slug:{
    type: Sequelize.STRING,
    primaryKey: true
  },

  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate:{
      len: {
        args: [10,150],
        msg: 'Please enter a title from 10-150 characters'
      }
    }
  },

  body: {
    type: Sequelize.TEXT,
    // defaultValue: 'Coming soon'
    // allowNull: false,
    //check if first character of the body value is uppercase if it isnt throws and error
    validate: {
        startsWithUpper: function(bodyVal){
          var first = bodyVal.charAt(0);
          var startsWithUpper = first === first.toUpperCase();
          if(!startsWithUpper){
            throw new Error('First letter must be an uppercase');
          }else{
            //nothing happens
          }
        }
      }

  }
  }, {
//disable timestamps created automatically
  timestamps: false
});
//this will connect to database and automatically creates table in the database
//using promise for asynchronous event
connection
    .sync({
      //forcely drop the existing table if exist
      force: true,
      logging: console.log
    })

    .then(function(){
    // inserting a record
      Article.create({
        slug: 'demo-title1',
        title: 'Lorem ipsum dolor',
        body: 'Lorem ipsum dolor sit amet,'

    //displaying all articles
    /*Article.findAll().then(articles=>{
      console.log(articles.defaultValues);
    });
    */
    //
    //   Article.findbyId({where:{slug:'demo-title'}}).then(function(articles){
    //   console.log(articles.dataValues);
    })

    .catch(function(error){
      console.log(error);
    });

//finding a record
// Article.findById(1).then(function(article){
//   console.log(article.dataValues);
// });

//display all articles in the database
//pluralize the table/modelname ex. from article -> articles
//articles=> is equal to .then(function(articles){}); =>arrow function
// Article.findAll().then(articles=> {
//   console.log(articles.length);
// });

});
