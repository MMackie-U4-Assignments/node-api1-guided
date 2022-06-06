// IMPORTS AT THE TOP

const express = require('express');
const Dog = require('./dog-model');

// INSTANCE OF EXPRESS APP

const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// ENDPOINTS

// [GET]    /             (Hello World endpoint)
server.get('/', (req, res) => {
    console.log('received a request!');
    res.status(200).json({ message: 'received a request!' });
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {
    Dog.findAll().then(result => {
        res.json(result);
    });
})

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', (req, res) => {
    Dog.findById(req.params.id).then(result => {
        if(result == null) {
            res.status(404).json({ message: 'dog not found!' });
            return;
        }
        
        res.json(result);
    });
});

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res) => {
    Dog.create(req.body)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(result => {
            res.status(500).json({ message: 'internal server error' });
        });
});

// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', (req, res) => {
    Dog.update(req.params.id, req.body).then(result => {
        if(result == null) {
            res.status(404).json({ message: 'dog not found!' });
            return;
        }
        
        res.json(result);
    });
});

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', (req, res) => {
    Dog.delete(req.params.id).then(result => {
        if(result == null) {
            res.status(404).json({ message: 'dog not found!' });
            return;
        }
        
        res.json(result);
    });
});

// EXPOSING THE SERVER TO OTHER MODULES

module.exports = server;
