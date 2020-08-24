const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const faker = require('faker')
const db = require('./db');
const {Friend} = db.models;
const bodyParser = require('body-parser');

const app = express();

app.use(volleyball);
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", async (req,res,next) =>{
  res.sendFile(path.join(__dirname +'/index.html'))
});

app.get("/api/friends", async (req,res,next) =>{
  const currentFriends = await Friend.findAll();
  res.send(currentFriends);
})

app.put("/api/friends/:id", async (req,res,next) =>{
  console.log(req.body);
  const friend = await Friend.findByPk(req.params.id)
  await friend.update(req.body);
  res.send(friend);
})

app.post("/api/friends", async (req,res,next) =>{
  console.log(req.body)
  const friend = await Friend.create({name: faker.name.firstName()});
  res.send(friend)
})

app.delete("/api/friends/:id", async (req,res,next) =>{
  const friend = await Friend.findByPk(req.params.id)
  await friend.destroy();
  res.send(friend);
})


const PORT = 3030;

const init = async function(){

  await db.syncAndSeed();

  app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
  })

}

init();
