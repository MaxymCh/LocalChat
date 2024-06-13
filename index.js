const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Configurer CORS pour Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*",  // Autoriser toutes les origines
    methods: ["GET", "POST"],  // Méthodes HTTP autorisées
    credentials: true  // Autoriser les cookies et les sessions à travers les requêtes
  }
});

const port = 4000;

// Liste des utilisateurs connectés (en mémoire pour l'instant)
const users = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  // Enregistrement de l'utilisateur
  socket.on('register', (userId) => {
    users[socket.id] = userId;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  // Réception d'un message d'un utilisateur
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    // Envoyer le message à tous les utilisateurs connectés
    io.emit('newMessage', { senderId: users[socket.id], content: message });
  });

  // Lorsque l'utilisateur se déconnecte
  socket.on('disconnect', () => {
    const userId = users[socket.id];
    console.log(`User ${userId} disconnected`);
    delete users[socket.id];
  });
});

server.listen(port, () => {
    console.log(`WebSocket server listening on port ${port}`);
});
