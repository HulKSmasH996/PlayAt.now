function setRoutes(app) {
    const IndexController = require('../controllers/index');
    const indexController = new IndexController();

    app.get('/', indexController.home);
    app.get('/about', indexController.about);
    // Add more routes as needed
}

module.exports = setRoutes;