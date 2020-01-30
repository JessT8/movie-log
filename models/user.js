/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let registerUser = (name, password, callback)=>{
    let insertQuery = 'INSERT INTO users (name,password) VALUES($1,$2)';
    let values = [name, password];
     dbPoolInstance.query(insertQuery, values, (err)=>{
        (err)? callback(err) : callback(null);
     });
 };
  // `dbPoolInstance` is accessible within this function scope
  return {
    registerUser
  };
};