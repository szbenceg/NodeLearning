const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://learning:learning@blearn.vg6gu.mongodb.net/databaseName?retryWrites=true&w=majority'
  )
  .then(client => {
    console.log('Connected!');
    _db = client.db("databaseName");
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () =>{
  if (_db){
    return _db;
  }
  throw "No database found!";
}

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


