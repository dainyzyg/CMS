var express = require('express')
var url = require("url")
var path = require("path")
var fs = require('fs')
var router = express.Router()
/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/login')
})
router.get('/login', function(req, res, next) {
    res.redirect('/login.html')
})
router.get('/session', function(req, res) {
    if (req.session.userInfo) {
        res.send(JSON.stringify(req.session.userInfo))
    }
    else {
        res.send('null')
    }
})
//router.all('*', function (req, res, next) {
//  //console.log('\033[31m', req.url, '\033[91m')
//  if (req.url == '/ajax/login' || req.session.userInfo) {
//    //console.log('\033[31m', 'session:true', '\033[91m')
//    next()
//  }
//  else {
//    //console.log('\033[31m', 'session:false', '\033[91m')
//    res.redirect('/login')
//  }
//})
router.all('/api/*', function(req, res) {
    var urlObject = url.parse(req.url)
    var context = require('../src' + urlObject.pathname)
    context.run(req, res)
})
router.all('/pages/*', function(req, res) {
    var urlObject = url.parse(req.url)
    var name = path.basename(req.url)
    var filesMapping = require(path.resolve(process.cwd(), 'public/dist/filesMapping.json'))
    if (filesMapping[name]) {
        res.render('antd', {
            entryName: filesMapping[name],
            common: filesMapping['common']
        })
    } else {
        var err = new Error('无法访问该页面！')
        err.status = 404
        throw err
    }
})
router.get('/ejs/*', function(req, res) {
    //var pathObject=path.parse(req.url)
    var urlObject = url.parse(req.url)
    var jspath = process.cwd() + urlObject.pathname + '.js'
    var ejsname = urlObject.pathname.replace('/ejs/', '')
    var rpath = '..' + urlObject.pathname
    fs.exists(jspath, function(exists) {
        if (!exists) {
            res.render(ejsname)
        }
        else {
            var fn = require(rpath)
            //创建promise
            var promise = fn(req)
            //绑定处理程序
            promise.then(function(data) {
                //promise成功的话会执行这里
                res.render(ejsname, data)
            }, function(err) {
                //promise失败会执行这里
                res.send('页面加载失败！')
            })
        }
    })
})

router.get('/extjs/*', function(req, res) {
    var urlName = req.url
    var regx = /(.+)(\.ext)(\?.+)?$/
    var rs = regx.exec(urlName)
    if (!rs) {
        throw new Error('文件扩展名不正确！')
    }
    else {
        var query = rs[3] ? rs[3] : ''
        var jsurl = '../javascripts' + rs[1] + '.js' + query
        var jspath = '../public/javascripts' + rs[1] + '.js'
        path.exists(jspath, function(exists) {
            if (!exists) {
                res.status(500)
                res.render('error', {
                    message: '指定的文件不存在：' + jspath,
                    error: { status: '', stack: '' }
                })
            }
            else {
                res.render('extJS5', { js: jsurl })
            }
        })
    }
})
module.exports = router
