const mongodbclient = require("mongodb").MongoClient
mongodbclient.connect('mongodb://localhost:27017/todoApp', (err, client) => {
    if (err) {
        return console.log("unabel to connect to MongoDB");
    }
    console.log("conectedto mongol joon");
    
    // const db = client.db("todoApp");
    // db.collection('todos').insertOne({
    //     text: "mmd reza and is a prens",
    //     completed: false
    // }, (err, result) => { 
    //     if (err) {
    //         return console.log("unabel to isert todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })
    const db = client.db("user");
    db.collection('user').insertOne({
        name: "mohamad reza",
        age:22,
        l:"peransa",
    }, (err, result) => { 
        if (err) {
            return console.log("unabel to isert user", err);
        }
        console.log(JSON.stringify(result,undefined,2));
    })
    client.close();
})