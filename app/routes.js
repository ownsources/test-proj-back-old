module.exports = function (app, passport) {

    var artists = require('./controllers/artist');
    var places = require('./controllers/place');
    var performances = require('./controllers/performance');

    //====== HOME PAGE ======
    app.get('/',  function (req, res) {
        res.render('index.ejs');
    });


    //====== LOGIN ======
    app.route('/login')
        .get(function (req, res) {
        res.render('login.ejs',
            { message: req.flash('loginMessage') });
    })
    // process the login form
        .post(passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));


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


    // ===== ARTISTS ======
    app.route('/artists').all(isLoggedIn)
        .get(artists.list)
        .post(artists.create);

    app.route('/artists/:id')
        .get(artists.get)
        .put(artists.update)
        .delete(artists.remove);


    // ===== PLACES ======
    app.route('/places')/*.all(isLoggedIn)*/
        .get(places.list)
        .post(places.create);

    app.route('/places/:id')
        .get(places.get)
        .put(places.update)
        .delete(places.remove);


    // ===== PERFORMANCES ======
    app.route('/performances')/*.all(isLoggedIn)*/
        .get(performances.list)
        .post(performances.create);

    app.route('/performances/:id')
        .get(performances.get)
        .put(performances.update)
        .delete(performances.remove);



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
