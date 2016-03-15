/**
 * Created by ad on 2016/2/24.
 */
var db = global.db
var mongodb = require('mongodb')
var fs = require('fs')
var path = require('path')

exports.run = function(req, res) {
    switch (req.body.action) {
        case 'save':
            var args = {
                projectID: req.body.projectID,
                year: req.body.year,
            }
            runMongo('test', args,
                (result) => {
                    res.send(JSON.stringify(result))
                })
            break
        default:
            break
    }
}

function runMongo(fileName, args, callback) {
    var mongoScript = fs.readFileSync(path.resolve(process.cwd(), `./src/lib/mongo/${fileName}.mongo`))
    db.command({
        eval: mongoScript.toString(),
        args: [args],
        nolock: true
    }).then((result) => {
        callback(result)
    })
}