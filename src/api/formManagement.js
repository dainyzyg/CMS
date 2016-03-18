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
        case 'deleteConfirm':
            deleteConfirm(req, res)
            break
        default:
            break
    }
}

function save(req, res) {
    mongoDBHelper.runMongo('formManagement/saveForm', JSON.parse(req.body.data),
        (err, result) => {
            res.send(JSON.stringify({ err, result }))
        })
}

function getList(req, res) {
    var args = {
        index: parseInt(req.body.index),
        limit: parseInt(req.body.limit),
        findField: parseInt(req.body.findField)
    }
    console.log(args)
    mongoDBHelper.runMongo('formManagement/getFormList', args,
        (err, result) => {
            console.log('result', JSON.stringify(result)),
                res.send(JSON.stringify(result))
        })
}
function deleteConfirm(req, res) {
    var args = {
        _id: req.body._id
    }
    console.log('_id', args._id),
        mongoDBHelper.runMongo('formManagement/deleteForm', args,
            (err, result) => {
                res.send(JSON.stringify(result))
            })
}