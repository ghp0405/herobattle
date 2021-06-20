/*
    express를 실행할 때(bin/www) database/dbcon에서 createPool을 호출하고 웹 서비스를 시작하게 한다.
    index에서 처음에 database/testDAO의 selectAll을 미들웨어로 호출한다.
    testDAO에서 select 구문을 실행하고 req에 db_result라는 속성으로 결과 rows를 담고 db close 후 callback.
    index.ejs에 데이터 {data: req.db_result}를 담아 랜더링
*/

const mysql = require('mysql');
let pool;
function createPool() {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'test',
        password: 'ccp@24865',
        connectionLimit: 100
    });
    return pool;
}

const con = createPool();

// ?를 사용하지 않는 모든 쿼리에 대한 쿼리 실행함수
async function execute(query, txConnection) {
    if(txConnection != undefined && txConnection != "undefined"){
        await txConnection.execute(query, function (err, rows) {
            if (err) {
                console.error("err : " + err);
                return false;
            }
            console.log("rows: " + JSON.stringify(rows));

            return rows;

            // tx 중에는 release처리를 하지 않고, 이후 쿼리로 넘긴다.
        });
    } else {
        await con.getConnection(async function (err, connection) {
            if (err) {
                console.error("err : " + err);
                return false;
            }
            await connection.execute(query, function (err, rows) {
                if (err) {
                    console.error("err : " + err);
                    return false;
                }
                console.log("rows: " + JSON.stringify(rows));

                connection.release();

                return rows;
            });
        });
    }
}

// ?를 사용하는 모든 쿼리에 대한 쿼리 실행함수
// insert, update, delete 등에 대한 affectedRows는 어떻게 받아오는지 연구 필요
async function query(query, params, txYn, txConnection) {
    if(txYn){
        await txConnection.query(query, params, function (err, rows) {
            if (err) {
                console.error("err : " + err);
                return false;
            }
            console.log("rows: " + JSON.stringify(rows));

            // tx 중에는 release처리를 하지 않고, 이후 쿼리로 넘긴다.
        });
    } else {
        await con.getConnection(async function (err, connection) {
            if (err) {
                console.error("err : " + err);
                return false;
            }
            await connection.query(query, params, function (err, rows) {
                if (err) {
                    console.error("err : " + err);
                    return false;
                }
                console.log("rows: " + JSON.stringify(rows));

                connection.release();
            });
        });
    }
}

module.exports.query = query;
module.exports.execute = execute;

module.exports.createPool = createPool;