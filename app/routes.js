var categorys   = require('./controllers/category');
var products    = require('./controllers/product');
var user        = require("./controllers/user");

var jwToken     = require("./services/jsToken");

module.exports = function (app) {

    app.route('/register')
        .post(user.register);

    app.route('/login')
        .post(user.login);

    app.route('/history/:token')
        .get(user.history);

    //====== LOGOUT ======
    app.route('/logout')
        .post(user.logout);

    app.route('/user/purchase')
        .put(user.purchase);

    // ===== CATEGORY ======
    app.route('/category')/*.all(isLoggedIn)*/
        .get(categorys.list)
        .post(categorys.create);

    app.route('/category/:id')
        .get(categorys.get)
        .put(categorys.update)
        .delete(categorys.remove);


    // ===== PRODUCT ======
    app.route('/product/:token')/*.all(isLoggedIn)*/
        .get(products.get)
        .post(products.create);

    app.route('/product/:token/:id')
        .put(products.update)
        .delete(products.remove);

};

function isLoggedIn(req, res, next) {
    jwToken.verifyToken(req.params.token, function (err, decoded) {
        if (err || !decoded) return {err: 'Что-то с токеном'};
        else return next();
    })
}