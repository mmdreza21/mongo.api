const { ObjectID } = require("mongodb");

const mongodbclient = require("mongodb").MongoClient
mongodbclient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log("unabel to connect to MongoDB");
    }
    console.log("conectedto mongol joon");
    
    const db = client.db("todoApp");
  db.collection("todo").deleteMany({text:'mmd naboodi bbini'}).then((result)=>{
      console.log(result);
  })

    client.close();
})