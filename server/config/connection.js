const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gamerbase');
>>>>>>> 78badf68efdf40664c80483f3457e0fb67d16270

module.exports = mongoose.connection;
