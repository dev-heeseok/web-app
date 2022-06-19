const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongodbURI: process.env.MOGODB_URI,
  serverPort: process.env.SERVER_PORT,
  saltRound: 10,
  jwtKey: "secretToken",
}