const express = require('express');
const app = express();
const routes = require('./routes');

const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookiParser = require('cookie-parser');
const configOption = require('./config/configOption');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/build')));
app.use(cookiParser());
app.use(cors());

mongoose.connect(configOption.mongodbURI, { dbName: "health-record" })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => {
    console.log('MongoDB Connect Failed...');
    process.exit(1);
  });

app.use('*', (req, res, next) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  
  console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds, req.method, req.originalUrl );

  next();
});

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.use('/api', routes);

app.listen(configOption.serverPort, () => console.log(`Server is running ${configOption.serverPort}`));
