const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js')

const app = express();

//init logger
app.use(logger);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
  
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members pi routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT  || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));