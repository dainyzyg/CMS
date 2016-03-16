var fs = require('fs')
var path = require('path')

var mongoDBHelper = {
    runMongo(fileName, args, callback) {
        var db = global.db
        var mongoScript = fs.readFileSync(path.resolve(process.cwd(), `./src/lib/mongo/${fileName}.mongo`))
        db.command({
            eval: mongoScript.toString(),
            args: [args],
            nolock: true
        }).then((result) => {
            callback(result)
        })
    }
}
module.exports = mongoDBHelper