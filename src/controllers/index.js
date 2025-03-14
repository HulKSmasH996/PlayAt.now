class IndexController {
    getHome(req, res) {
        res.send('Welcome to PlayAt.now!');
    }

    getAbout(req, res) {
        res.send('About PlayAt.now');
    }

    // Add more methods as needed for other routes
}

module.exports = IndexController;