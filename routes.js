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

  //MOVIES
 // app.get('/about', movieControllerCallbacks.about)
 // app.get('/movies',movieControllerCallbacks.movielist);
  //USERS
   app.get('/register', userControllerCallbacks.registerPage);
   app.post('/register', userControllerCallbacks.register);
  // app.get('/signin', userControllerCallbacks.signin);
};