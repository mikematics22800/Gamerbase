const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js
const gameSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  platforms: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {_id: false});

const Game = model('Game', gameSchema);

module.exports = Game;
