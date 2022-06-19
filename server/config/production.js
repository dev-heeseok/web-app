// TODO. heroku 와 같은 배포 시스템에서 설정한 Config 데이터 설정

module.exports = {
  mongodbURI: process.env.MOGODB_URI,
  serverPort: process.env.SERVER_PORT,
  saltRound: 10,
  jwtKey: "secretToken",
}