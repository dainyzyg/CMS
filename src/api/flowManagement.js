/**
 * Created by ad on 2016/2/24.
 */
var path = require('path')
var mongoDBHelper = require(path.resolve(process.cwd(), './src/lib/utils/mongoDBHelper'))

exports.run = function(req, res) {
    console.log(req.body.action)
    switch (req.body.action) {
        case 'save':
            save(req, res)
            break
        case 'getList':
            getList(req, res)
            break
        case 'get':
            get(req, res)
            break
        case 'deleteConfirm':
            deleteConfirm(req, res)
            break
        default:
            break
    }
}

function save(req, res) {
    mongoDBHelper.runMongo('flowManagement/saveFlow', JSON.parse(req.body.data),
        (err, result) => {
            res.send(JSON.stringify({ err, result }))
        })
}
function get(req, res) {
    mongoDBHelper.runMongo('flowManagement/getFlow', JSON.parse(req.body.params),
        (err, result) => {
            res.send(JSON.stringify({ err, result }))
        })
}
function getList(req, res) {
    var args = {
        index: parseInt(req.body.index),
        limit: parseInt(req.body.limit),
        findField: req.body.findField
    }
    console.log(args)
    mongoDBHelper.runMongo('flowManagement/getFlowList', args,
        (err, result) => {
            console.log('result', JSON.stringify({ err, result })),
                res.send(JSON.stringify({ err, result }))

        })
}
function deleteConfirm(req, res) {
    var args = {
        _id: req.body._id
    }
    //console.log('_id', args._id),
    mongoDBHelper.runMongo('flowManagement/deleteFlow', args,
        (err, result) => {
            res.send(JSON.stringify(result))
        })
}