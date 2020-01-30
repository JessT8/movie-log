/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let registerUser = (name, password, callback)=>{
    let insertQuery = 'INSERT INTO users (username,password) VALUES($1,$2)';
    let values = [name, password];
     dbPoolInstance.query(insertQuery, values, (err)=>{
        (err)? callback(err) : callback(null);
     });
 };
 let validateUser = (username,password, callback) => {
    let query = 'SELECT * FROM users WHERE username=$1 AND password=$2';
    let values = [username, password];
    dbPoolInstance.query(query, values, (error, queryResult) => {
        if(error){
            callback(error,null);
        }else{
            callback(null, queryResult.rows);
        }
    });
  };
  // `dbPoolInstance` is accessible within this function scope
  return {
    registerUser,
    validateUser
  };
};