const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js
const gameSchema = new Schema({
  id: {
    type: String,
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
  platformIds: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  }
}, { _id: false });

module.exports = gameSchema;
