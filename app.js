
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
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  body: {
    type: Sequelize.TEXT
    // defaultValue: 'Coming soon'
  }
  }, {
//disable timestamps created automatically
  timestamps: false

});
//this will connect to database and automatically creates table in the database
//using promise for asynchronous event
connection.sync({
  //forcely drop the existing table if exist
  force: true
}).then(function(){
//inserting a record
  // Article.create({
  //   title: 'demo-title',
  //   body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  // })

//finding a record
// Article.findById(1).then(function(article){
//   console.log(article.dataValues);
// });

//display all articles in the database
//pluralize the table/modelname ex. from article -> articles
//articles=> is equal to .then(function(articles){}); =>arrow function
Article.findAll().then(articles=> {
  console.log(articles.length);
});

});
