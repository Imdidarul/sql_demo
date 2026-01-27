const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('testdb','root','********',{
    host: 'localhost',
    dialect: 'mysql'
});


(async()=>{ try {
    await sequelize.authenticate();
    console.log("Connected to database");

}catch(err){
    console.log(err);
}})();


module.exports = sequelize