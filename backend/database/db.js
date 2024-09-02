const mysql = require("mysql2/promise");
const config = require("./config");

var connection;

const connect = async() => {
    try{
        connection = await mysql.createConnection(config.db);
        console.log("=================================================");
        console.log(`Connection to ${config.db.database} successful`);
        console.log("=================================================");
    }catch(error){
        console.error(`>>> Error connecting to ${config.db.database}`, error);
    } 
}

const query = async(sql, params) =>{

    if(!connection){
        await connect();
    }

    try{
        const [results] = await connection.query(sql, params);
        return results;
    }catch(error){
        console.error(`Query error -> ${sql}`, error);
    }

}

module.exports = {
    query,
}