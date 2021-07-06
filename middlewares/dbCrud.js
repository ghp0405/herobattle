/*
    express를 실행할 때(bin/www) database/dbcon에서 createPool을 호출하고 웹 서비스를 시작하게 한다.
    index에서 처음에 database/testDAO의 selectAll을 미들웨어로 호출한다.
    testDAO에서 select 구문을 실행하고 req에 db_result라는 속성으로 결과 rows를 담고 db close 후 callback.
    index.ejs에 데이터 {data: req.db_result}를 담아 랜더링
*/

const mysql = require('mysql2/promise');
const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'ccp24865',
    port: 3306,
    connectionLimit: 100
};
const pool = mysql.createPool(dbConfig);

// ?를 사용하지 않는 모든 쿼리에 대한 쿼리 실행함수
let execute = async (query, params, txConnection) => {
    if(txConnection != undefined && txConnection != "undefined"){
        let [rows] = await txConnection.execute(query, params);
        return rows;
    } else {
        let connection = await pool.getConnection();
        let [rows] = await connection.execute(query, params);
        connection.release();
        return rows;
    }
}

// ?를 사용하는 모든 쿼리에 대한 쿼리 실행함수
// insert, update, delete 등에 대한 affectedRows는 어떻게 받아오는지 연구 필요
let query = async (query, params, txConnection) => {
    if(txConnection != undefined && txConnection != "undefined"){
        let [rows] = await txConnection.query(query, params);
        return rows;
    } else {
        let connection = await con.getConnection();
        let [rows] = await connection.query(query, params);
        connection.release();
        return rows;
    }
}

module.exports.query = query;
module.exports.execute = execute;

