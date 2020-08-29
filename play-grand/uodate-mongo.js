const { ObjectID } = require("mongodb");

const mongodbclient = require("mongodb").MongoClient
mongodbclient.connect("mongodb://localhost:27017/todoApp", (err, client) => {
    if (err) {
        console.log("i cant do that");
    }
    console.log(" conected to mongol jooon");
    let db = client.db("todoApp")
    db.collection("todo").findOneAndUpdate({_id: new ObjectID("5f437b508471203368b290d3") },{
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })
    let db2 =client.db("user")
db2.collection("user").findOneAndUpdate({_id:new ObjectID("5f428a743423a377fbe33766")},{
    $inc:{
        age:2
    }
},{
    returnOriginal:false
}).then((res)=>{
    console.log(JSON.stringify(res,undefined,2));
})
    client.close();
})