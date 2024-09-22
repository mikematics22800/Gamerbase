const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js
const gameSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  platforms: [
    {
      type: String,
    },
  ],
  genres: [
    {
      type: String
    }
  ],
  image: {
    type: String,
  },
});

module.exports = gameSchema;
