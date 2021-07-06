const db = require('../middlewares/dbCrud');

exports.SelectCustomers = async function(txConnection) {

    try {
        const query =
            ` SELECT id, name, age, password FROM customers; `;
        const result = await db.execute(query, txConnection);

        return result;
    } catch (e) {
        console.log(e);
        return false;
    }

};

exports.InsertCustomers = async function(name, age, password, txConnection) {

    try {
        const query =
            ` INSERT INTO customers SET ? `;
        const data = {
            name: name,
            age: age,
            password: password
        };
        const result = await db.query(query, data, txConnection);

        return result;
    } catch (e) {
        console.log(e);
        return false;
    }

};

exports.UpdateCustomers = async function(id, name, age, password, txConnection) {

    try {
        const query =
            ` INSERT INTO customers SET ? V FROM customers; `;
        const data = {
            id: id,
            name: name,
            age: age,
            password: password
        };
        const result = await db.query(query, data, txConnection);

        return result;
    } catch (e) {
        console.log(e);
        return false;
    }

};

/*

const connection = con.getConnection();

connection.beginTransaction();

connection.release();

 */