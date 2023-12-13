const express = require('express');
const server = express();

server.use(express.json());

// Configure your routes
const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);

module.exports = server;
