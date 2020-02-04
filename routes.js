var multer = require('multer');
var upload = multer({ dest: './uploads/' });
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
  const followControllerCallbacks = require('./controllers/follow')(allModels);
  //movies
  app.get("/", movieControllerCallbacks.redirect);
  app.get('/credits',movieControllerCallbacks.credit);
  app.get('/movies/upcoming/:num',movieControllerCallbacks.upcomingMovies);
  app.get('/movies/popular/:num',movieControllerCallbacks.popularMovies);
  app.get('/movies/nowPlaying/:num',movieControllerCallbacks.nowPlayingMovies);
  app.get('/movies/:id/', movieControllerCallbacks.getMovie);
  //Movie list
  app.get('/people/movielist/:id', movielistControllerCallbacks.getPersonWatchlist);
  app.get('/movielist', movielistControllerCallbacks.movielist);
  app.post('/movies/:id', movielistControllerCallbacks.bookmarkMovie);
  app.post('/movielist/:id/favorite', movielistControllerCallbacks.updateFavorite);
  app.post('/movielist/:id/complete', movielistControllerCallbacks.updateComplete);
  app.get('/completed',movielistControllerCallbacks.completedMovies);
  app.get('/favorite',movielistControllerCallbacks.favoriteMovies);
  app.delete('/movielist/:id/delete', movielistControllerCallbacks.deleteMovie);
  //Users
  app.get('/register', userControllerCallbacks.registerPage);
  app.post('/register', userControllerCallbacks.register);
  app.get('/signin', userControllerCallbacks.signin);
  app.post('/signin', userControllerCallbacks.signingIn);
  app.get('/signout', userControllerCallbacks.signout);
  app.get('/people', userControllerCallbacks.getUsers);
  app.get('/profile', userControllerCallbacks.profile);
  app.post('/test',upload.single('myFile'), userControllerCallbacks.testPost);
//   app.post('/people/:id', upload.single('myFile'), function(req, res) {
//   cloudinary.uploader.upload(req.file.path, function(result) {
//     res.send(result);
//   });
// });
  //Follow
  app.get('/followed', followControllerCallbacks.getFollowed);
  app.get('/followers', followControllerCallbacks.getFollowers);
  app.post('/people/:id', followControllerCallbacks.followUser);
};