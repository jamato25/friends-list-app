const Sequelize = require('sequelize');
const faker = require('faker');

const db = new Sequelize('postgres://localhost/friendsList', {logging: false});

const Friend = db.define("Friend",{
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5
  }
})

const syncAndSeed = async() =>{
  await db.sync({force: true});
  const promises = [];
  while(promises.length<5){
    promises.push(
      Friend.create({
        name: faker.name.firstName(),
        rating: faker.random.number({
          'min':0,
          'max':10
        })
      })
    )
  }
  await Promise.all(promises);
}

module.exports = {
  models:{
    Friend
  },
  syncAndSeed
};
