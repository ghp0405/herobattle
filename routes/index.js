const express = require('express');
const router = express.Router();
const crudRepo = require('../repository/crudRepo');

/* GET home page. */
router.get('/', async function(req, res, next) {

  // function(txYn = false, txConnection = undefined)
  const dbResult = await crudRepo.SelectCustomers();

  res.render('index', { title: 'Express', data: dbResult });

  return true;

});

/** 고객 정보 삽입 **/
router.post('/', async function(req, res, next) {

  // function(txYn = false, txConnection = undefined)
  const dbResult = await crudRepo.InsertCustomers();

  res.send({ flag: 'SUCCESS' });

  return true;

});

module.exports = router;
