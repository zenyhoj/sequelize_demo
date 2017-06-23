//import sequelize
var Sequelize = require('sequelize');
//instantiate connection
var connection = new Sequelize('contacts', 'zenyhoj', 'joe.bals0515', {
  host: 'localhost',
  dialect: 'mysql'
});

//create the modelname and property , 2 parameters (1 modelname/tablename, 2 fields )

var Contacts = connection.define('contacts', {
  empId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false

  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: true
    validate: {
      isEmail: {
        args: true,
        msg: 'Please input correct email'
      }
    }
  }
}, {
  // timestamps: false
  hooks: {
    beforeValidate: function() {
      console.log('beforeValidate');
    },
    afterValidate: function() {
      console.log('afterValidate');
    },
    afterCreate: function() {
      console.log('contact successfully ceated');
    },

    beforeCreate: function() {
      console.log('beforeCreate');
    }

  }
});
//model and property declarations ends here
//
//Persisting/Automaically saving the data into the database
//connections takes 3 paramaters
connection.sync({
  //forcely drop the existing database/table contents if any exists
  // force: true,
  // logging: console.log()
})
//uses Promise for asynchronous transaction
  .then(function() {
  //create the contacts
  Contacts.create({
    empId: '001-01-16',
    firstName: 'joe',
    lastName: 'balingit',
    address: 'rizal',
    email: 'joebalingit@gmail111.com'
  }).catch(function(error) {
    console.log(error);

  });

});
