var path = require('path')
var mongoDBHelper = require(path.resolve(process.cwd(), './src/lib/utils/mongoDBHelper'))

exports.run = function (req, res) {
    console.log(req.body.action)
    switch (req.body.action) {
        case 'getOUTreeAsync':
            getOUTreeAsync(req, res)
            break
        default:
            break
    }
}

function getOUTreeAsync(req, res) {
    mongoDBHelper.runMongo('ouManagement/getOUTreeAsync', req.body.id,
        (err, result) => {
            if (err) {
                res.send(JSON.stringify([]))
            } else {
                res.send(JSON.stringify(result.retval))
            }
        })
}