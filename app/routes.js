module.exports = function (app, passport) {

    var categorys = require('./controllers/category');
    var products = require('./controllers/product');

    //====== HOME PAGE ======
    app.get('/',  function (req, res) {
        res.render('index.ejs');
    });


    //====== LOGIN ======
    app.route('/login')
        .get(function (req, res) {
            res.render('index.html');
        })
        // process the login form
        .post(
            passport.authenticate('local'),function (req, res) {
                res.json(req.body.username);
            });


    //====== PROFILE SECTION ======

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('content.ejs', {
            // get the user out of session and pass to template
            user : req.user
        });
    });
    //====== LOGOUT ======
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })


    // ===== CATEGORY ======
    app.route('/categorys')/*.all(isLoggedIn)*/
        .get(categorys.list)
        .post(categorys.create);

    app.route('/categorys/:id')
        .get(categorys.get)
        .put(categorys.update)
        .delete(categorys.remove);


    // ===== PRODUCT ======
    app.route('/products')/*.all(isLoggedIn)*/
        .get(products.list)
        .post(products.create);

    app.route('/products/:id')
        .get(products.get)
        .put(products.update)
        .delete(products.remove);


    //====== 404 =======
    app.get('/*', function (req, res) {
        res.status(404);
        res.render('404.ejs');
    })
};

function isLoggedIn(req, res, next){

    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}
