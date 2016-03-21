module.exports = function getComponent(location, cb) {
    require.ensure([], (require) => {
        cb(null, require('./../lib/components/test2'))
    })
}
