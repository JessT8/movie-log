module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const movieControllerCallbacks = require('./controllers/movie')(allModels);
  const userControllerCallbacks = require('./controllers/user')(allModels);
  app.get('/watchlist', movieControllerCallbacks.getWatchlist);
  app.get('/movies/:id/', movieControllerCallbacks.getMovie);
  app.post('/movies/:id', movieControllerCallbacks.bookmarkMovie);
  app.get('/',movieControllerCallbacks.movielist);
  app.get('/about',movieControllerCallbacks.about);
  //USERS
  app.get('/register', userControllerCallbacks.registerPage);
  app.post('/register', userControllerCallbacks.register);
  app.get('/signin', userControllerCallbacks.signin);
  app.post('/signin', userControllerCallbacks.signingIn);
    app.get('/signout', userControllerCallbacks.signout);
};