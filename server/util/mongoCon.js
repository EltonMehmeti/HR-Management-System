const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;



const mongoConnect = (callback) => {

MongoClient.connect('mongodb+srv://eltonmhmt:ghjsC0rBHq35MrPG@cluster0.kg03jet.mongodb.net/').then(client => {
  console.log('Connected!');
  callback(client);
  client.close();
}).catch(err => {
  console.log(err);
});
}


module.exports = mongoConnect;
// eltonmhmt
// ghjsC0rBHq35MrPG