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
  const movielistControllerCallbacks = require('./controllers/movielist')(allModels);
  const userControllerCallbacks = require('./controllers/user')(allModels);
  //movies
  app.get("/", movieControllerCallbacks.redirect);
  app.get('/credits',movieControllerCallbacks.about);
  app.get('/movies/upcoming/:num',movieControllerCallbacks.upcomingMovies);
  app.get('/movies/popular/:num',movieControllerCallbacks.popularMovies);
  app.get('/movies/nowPlaying/:num',movieControllerCallbacks.nowPlayingMovies);
  app.get('/movies/:id/', movieControllerCallbacks.getMovie);
  //Movie list
  app.get('/people/watchlist/:id', movielistControllerCallbacks.getPersonWatchlist);
  app.get('/watchlist', movielistControllerCallbacks.getWatchlist);
  app.post('/movies/:id', movielistControllerCallbacks.bookmarkMovie);
  app.post('/watchlist/:id/favorite', movielistControllerCallbacks.updateFavorite);
  app.post('/watchlist/:id/complete', movielistControllerCallbacks.updateComplete);
  app.get('/completed',movielistControllerCallbacks.completedMovies);
  app.get('/favorite',movielistControllerCallbacks.favoriteMovies);
  app.delete('/watchlist/:id/delete', movielistControllerCallbacks.deleteMovie);
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