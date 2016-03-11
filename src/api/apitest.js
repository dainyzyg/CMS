/**
 * Created by ad on 2016/2/24.
 */
var db = global.db
var mongodb = require('mongodb')
var fs = require('fs')
var path = require('path')

exports.run = function (req, res) {
    //mongodb.Code('print("test.js")',function (err, result, a, b) {
    //    res.send(JSON.stringify(result));
    //});
    //db.eval(function (){print("xxxxxxxxxxxxxxxxxxxxxxxxxx"); return db.tree.find().toArray();}, [], function (err, result, a, b) {
    //    res.send(JSON.stringify(result));
    //});
    var mongoScript = fs.readFileSync(path.resolve(process.cwd(), './src/lib/mongo/getFormList.mongo'))
    console.log(mongoScript)
    //res.send(mongoScript.toString())
    db.command({
        eval: mongoScript.toString(),
        args: [3,3],
        nolock: true
    }).then(function (result) {
        res.send(JSON.stringify(result))
    })
    //var treeCol = db.collection('tree');
    //treeCol.find({}).toArray(function (err, docs) {
    //    res.send(JSON.stringify(docs));
    //});
}