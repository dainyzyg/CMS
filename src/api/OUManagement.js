/**
 * Created by Baggio on 2016/5/17
 * 组织机构管理js.
 */
var path = require('path')
var mongoDBHelper = require(path.resolve(process.cwd(), './src/lib/utils/mongoDBHelper'))

exports.run = function (req, res) {
    //console.log(req.body.action)
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
    var args = {
        _id:req.body._id,
        OUName: req.body.OUName,
        createTime: req.body.createTime,
        showOrder: parseInt(req.body.showOrder),
        path: req.body.path
    }
    mongoDBHelper.runMongo('OUManagement/saveOU', args,
        (err, result) => {
            res.send(JSON.stringify({err, result}))
        })
}

function getList(req, res) {
    var args = {
        index: parseInt(req.body.index),
        limit: parseInt(req.body.limit),
        findField: req.body.findField,
        treeNode: req.body.treeNode
    }
    mongoDBHelper.runMongo('OUManagement/getOUList', args,
        (err, result) => {
                res.send(JSON.stringify({err, result}))

        })
}
function deleteConfirm(req, res) {
    var args = {
        _id: req.body._id
    }
        mongoDBHelper.runMongo('OUManagement/deleteOU', args,
            (err, result) => {
                res.send(JSON.stringify(result))
            })
}