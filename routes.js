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
  app.get("/", movieControllerCallbacks.redirect);
  app.get('/people/watchlist/:id', movieControllerCallbacks.getPersonWatchlist);
  app.get('/watchlist', movieControllerCallbacks.getWatchlist);
  app.get('/movies/:id/', movieControllerCallbacks.getMovie);
  app.post('/movies/:id', movieControllerCallbacks.bookmarkMovie);
  app.get('/movies/upcoming/:num',movieControllerCallbacks.upcomingMovies);
  app.get('/movies/popular/:num',movieControllerCallbacks.popularMovies);
  app.get('/movies/nowPlaying/:num',movieControllerCallbacks.nowPlayingMovies);
  app.get('/credits',movieControllerCallbacks.about);
  app.get('/completed',movieControllerCallbacks.completedMovies);
  app.get('/favorite',movieControllerCallbacks.favoriteMovies);
  app.post('/watchlist/:id/favorite', movieControllerCallbacks.updateFavorite);
  app.post('/watchlist/:id/complete', movieControllerCallbacks.updateComplete);
  app.delete('/watchlist/:id/delete', movieControllerCallbacks.deleteMovie);
  //Users
  app.get('/register', userControllerCallbacks.registerPage);
  app.post('/register', userControllerCallbacks.register);
  app.get('/signin', userControllerCallbacks.signin);
  app.post('/signin', userControllerCallbacks.signingIn);
  app.get('/signout', userControllerCallbacks.signout);
  app.get('/people', userControllerCallbacks.getUsers);
  //Follow
  app.get('/followed', userControllerCallbacks.getFollowed);
  app.get('/followers', userControllerCallbacks.getFollowers);
  app.post('/people/:id', userControllerCallbacks.followUser);
};