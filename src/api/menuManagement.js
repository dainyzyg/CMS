/**
 * Created by Baggio on 2016/3/23.
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
        menuName: req.body.menuName,
        functionURL: req.body.functionURL,
        description: req.body.description,
        createTime: req.body.createTime,
        showOrder: req.body.showOrder,
        path: req.body.path
    }
    console.log('saveArgs',args)
    mongoDBHelper.runMongo('MenuManagement/saveMenu', args,
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
    console.log('args', args)
    mongoDBHelper.runMongo('MenuManagement/getMenuList', args,
        (err, result) => {
            console.log('result1111', JSON.stringify({err, result})),
                res.send(JSON.stringify({err, result}))

        })
}
function deleteConfirm(req, res) {
    var args = {
        _id: req.body._id
    }
    console.log('删除_id', args._id),
    mongoDBHelper.runMongo('menuManagement/deleteMenu', args,
        (err, result) => {
            res.send(JSON.stringify(result))
        })
}