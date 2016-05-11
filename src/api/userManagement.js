/**
 * Created by Baggio on 2016/4/27.
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
        case 'getTreeList':
            getTreeList(req, res)
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
        _id: req.body._id,
        userName: req.body.userName,
        personName: req.body.personName,
        OUId:req.body.OUId,
        passWord:req.body.passWord
    }
    console.log('saveArgs',args)
    mongoDBHelper.runMongo('UserManagement/saveUser', args,
        (err, result) => {
            res.send(JSON.stringify({err, result}))
        })
}

function getList(req, res) {
    var args = {
        index: parseInt(req.body.index),
        limit: parseInt(req.body.limit),
        findField: req.body.findField,
        OUID: req.body.OUID
    }
    console.log('args',args,'args.ouid', args.OUID)
    mongoDBHelper.runMongo('UserManagement/getOUUserList', args,
        (err, result) => {
            console.log('getOUUserList',result)
            console.log('result.retval.totalCount',result.retval.totalCount)
                res.send(JSON.stringify({err, result}))

        })
}
function getTreeList(req, res) {

    mongoDBHelper.runMongo('UserManagement/getTreeList',{},
        (err, result) => {
                res.send({err, result})

        })
}
function deleteConfirm(req, res) {
    var args = {
        _id: req.body._id
    }
        mongoDBHelper.runMongo('userManagement/deleteUser', args,
            (err, result) => {
                res.send(JSON.stringify(result))
            })
}