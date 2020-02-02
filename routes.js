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
  //movies
  app.get('/watchlist', movieControllerCallbacks.getWatchlist);
  app.get('/movies/:id/', movieControllerCallbacks.getMovie);
  app.post('/movies/:id', movieControllerCallbacks.bookmarkMovie);
  app.get('/',movieControllerCallbacks.movielist);
  app.get('/about',movieControllerCallbacks.about);
  app.get('/completed',movieControllerCallbacks.completedMovies);
  app.get('/favorite',movieControllerCallbacks.favoriteMovies);
  app.post('/watchlist/:id/favorite', movieControllerCallbacks.updateFavorite);
  app.post('/watchlist/:id/complete', movieControllerCallbacks.updateComplete);
  //USERS
  app.get('/register', userControllerCallbacks.registerPage);
  app.post('/register', userControllerCallbacks.register);
  app.get('/signin', userControllerCallbacks.signin);
  app.post('/signin', userControllerCallbacks.signingIn);
  app.get('/signout', userControllerCallbacks.signout);
  app.get('/people', userControllerCallbacks.getUsers);
};