// IMPORTS AT THE TOP

const express = require('express');
const Dog = require('./dog-model');

// INSTANCE OF EXPRESS APP

const server = express();

// GLOBAL MIDDLEWARE

// ENDPOINTS

// [GET]    /             (Hello World endpoint)
server.get('/', (req, res) => {
    console.log('received a request!');
    res.json({ message: 'received a request!' });
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {
    Dog.findAll().then(result => {
        res.json(result);
    });
})

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:qwerty', (req, res) => {
    res.json(req.params);
});

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES

module.exports = server;
