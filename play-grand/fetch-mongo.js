const { ObjectID } = require("mongodb");

const mongodbclient = require("mongodb").MongoClient
mongodbclient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log("unabel to connect to MongoDB");
    }
    console.log("conectedto mongol joon");
    
    const db = client.db("user");
  db.collection("user").find({_id:new ObjectID("5f428a743423a377fbe33766")}).toArray().then((docs)=>{
      console.log('user');
      console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
      console.log("we cant conect",err);
  })
db.collection("user").find().count().then((count)=>{
    console.log(`user count_____>>>   ${count}`);
},(err)=>{
    console.log("we cant conect",err);
})
    client.close();
})