var path = require('path');
var mongoDBHelper = require(path.resolve(process.cwd(), './src/lib/utils/mongoDBHelper'));

exports.run = function (req, res) {
    console.log(req.body.action);
    switch (req.body.action) {
        case 'verify':
            verify(req, res);
            break;
        default:
            break
    }
};

function verify(req, res) {
    console.log(req.body);
    mongoDBHelper.runMongo('loginManagement/verifyUser',req.body,
        (err, result) => {
            console.log(req.result);
            res.send(JSON.stringify({err, result}))
        })
}