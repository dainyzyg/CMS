/**
 * Created by ad on 2016/2/24.
 */
var path = require('path')
var mongoDBHelper = require(path.resolve(process.cwd(), './src/lib/utils/mongoDBHelper'))

exports.run = function(req, res) {
    switch (req.body.action) {
        case 'save':
            save(req, res)
            break
        case 'getList':
            getList(req, res)
            break
        default:
            break
    }
}

function save(req, res) {
    var args = {
        projectID: req.body.projectID,
        year: req.body.year,
    }
    mongoDBHelper.runMongo('test', args,
        (result) => {
            res.send(JSON.stringify(result))
        })
}
function getList(req, res) {
    var args = {
        index: parseInt(req.body.index),
        limit: parseInt(req.body.limit),
    }
    mongoDBHelper.runMongo('formManagement/getFormList', args,
        (result) => {
            res.send(JSON.stringify(result))
        })
}