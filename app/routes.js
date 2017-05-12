module.exports = function (app, passport) {

    var categorys = require('./controllers/category');
    var products = require('./controllers/product');


    //====== LOGIN ======
    app.route('/login')
        .post(
            passport.authenticate('local'),function (req, res) {
                res.json(req.body.username);
            });


    //====== LOGOUT ======
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })


    // ===== CATEGORY ======
    app.route('/category')/*.all(isLoggedIn)*/
        .get(categorys.list)
        .post(categorys.create);

    app.route('/category/:id')
        .get(categorys.get)
        .put(categorys.update)
        .delete(categorys.remove);


    // ===== PRODUCT ======
    app.route('/product')/*.all(isLoggedIn)*/
        .get(products.list)
        .post(products.create);

    app.route('/product/:id')
        .get(products.get)
        .put(products.update)
        .delete(products.remove);

};

function isLoggedIn(req, res, next){

    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}
