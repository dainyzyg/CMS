/**
 * Created by ad on 2016/2/24.
 */
var path = require('path')
var mongoDBHelper = require(path.resolve(process.cwd(), './src/lib/utils/mongoDBHelper'))

exports.run = function(req, res) {
    console.log(req.body.action)
    switch (req.body.action) {
        case 'getList':
            getList(req, res)
            break
        case 'get':
            get(req, res)
            break
        default:
            break
    }
}


function get(req, res) {
    mongoDBHelper.runMongo('Dispatch/getDispatch', JSON.parse(req.body.params),
        (err, result) => {
            res.send(JSON.stringify({ err, result }))
        })
}
function getList(req, res) {
    var args = {

        index: parseInt(req.body.index),
        limit: parseInt(req.body.limit),
        userId:req.body.userId,
    }

    mongoDBHelper.runMongo('Dispatch/getDispatchList', args,
        (err, result) => {
            console.log('result', JSON.stringify({ err, result })),
                res.send(JSON.stringify({ err, result }))

        })
}