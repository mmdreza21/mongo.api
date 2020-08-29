// const mongodbclient = require("mongodb").MongoClient
// mongodbclient.connect("mongodb://localhost:27017/todoApp", (err, client) => {
//     if (err) {
//         return console.log('your client is shet');
//     }
//     console.log("you conected to mongol joon");
//     const db = client.db("todoApp")
//     db.collection("todo").findOneAndDelete({completed: true}).then((result) => {
//         console.log(result);
//     })
//     client.close()
// })
const mongodbclient = require("mongodb").MongoClient
mongodbclient.connect("mongodb://localhost:27017/todoApp", (err, client) => {
    if (err) {
        return console.log('your client is shet');
    }
    console.log("you conected to mongol joon");
    const db = client.db("todoApp")
    db.collection("todo").findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    })
    client.close()
})
