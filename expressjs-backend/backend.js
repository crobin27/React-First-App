const express = require('express');
const app = express();
const port = 5000;



const cors = require('cors');
app.use(cors());
app.use(express.json());

//create a '/' get function
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//create a get function for /users
app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined & job != undefined){
      let result = findUserByNameAndJob(name, job);
      result = {user_list: result};
      res.send(result);
   }
   else if (name != undefined){
      let result = findUserByName(name);
      result = {user_list: result};
      res.send(result);
   }
   else if (job != undefined){
      let result = findUserByJob(job);
      result = {user_list: result};
      res.send(result);
   }
   else{
    res.send(users);
   }
});


const findUserByNameAndJob = (name, job) => {
   test = users['users_list'].filter( (user) => user['job'] === job);
   test = test.filter( (user) => user['name'] === name);
   return test;
}
const findUserByJob = (job) => {
   return users['users_list'].filter( (user) => user['job'] === job);
}

const findUserByName = (name) => {
   return users['users_list'].filter( (user) => user['name'] === name);
}

app.get('/users/:id', (req, res) => {
   const id = req.params['id'];
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
   else {
      result = {users_list: result};
      res.send(result);
   }
});

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   //this generates an id between 100000-99999
   userToAdd.id = parseInt(Math.random() * (999999 - 100000) + 100000).toString();
   addUser(userToAdd);
   res.status(201).send(userToAdd).end();
})

function addUser(user){
   users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
   const id = req.params['id'];
   const flag = deleteUser(id);
   if (flag == 1){
      res.status(204).end();
   }
   else{
      res.status(404).send('Resource not found');
   }
})

function deleteUser(id){
   index = users['users_list'].findIndex(value => {
      return value.id === String(id);
   });
   if(index === -1){
      return -1;
   }
   else {
   users['users_list'].splice(index, 1);
   return 1;
   }
}

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 
 