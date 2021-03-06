var mongo = require('mongodb'),
  settings = require('./settings');
 
var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;
 
var server = new Server(settings.mongo.host, settings.mongo.port, {auto_reconnect: true});
db = new Db(settings.mongo.db, server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to", settings.mongo.db, "database");
        db.collection(settings.mongo.coll, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The", settings.mongo.coll, "collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

var populateDB = function() {
    var urls = [{
    }];
 
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.insert(urls, {safe:true}, function(err, result) {});
    });
};

module.exports = db;
