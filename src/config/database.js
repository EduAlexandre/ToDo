const mongoose = require('mongoose');

const url = 'yourURL';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

module.exports = mongoose; 