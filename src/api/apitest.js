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
    var mongoScript = fs.readFileSync(path.resolve(process.cwd(), './src/lib/mongo/saveForm.mongo'))
    console.log(mongoScript)
    //res.send(mongoScript.toString())
    var mydate = new Date();
    var dates = ( mydate.getFullYear() + "/" + (mydate.getMonth()+1)+ "/" + mydate.getDate() + "/" );
    var data = {
       _id: "56e2672a38e2124a0c85c27f",
        formName: "东方东方网IP地址申请6666",
        discription: "广域网IP地址申请测试id",
        createTime: dates,
        creater: "luzg",
        lastmodifyTime: "2016/03/08"
    }
    db.command({
        eval: mongoScript.toString(),
        args: [data],
        nolock: true
    }).then(function (result) {
        res.send(JSON.stringify(result))
    })
    //var treeCol = db.collection('tree');
    //treeCol.find({}).toArray(function (err, docs) {
    //    res.send(JSON.stringify(docs));
    //});
}