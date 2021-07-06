const express = require('express');
const router = express.Router();
const crudRepo = require('../repository/crudRepo');

/* GET home page. */
router.get('/', async function(req, res, next) {

  const dbResult = await crudRepo.SelectCustomers('');

  res.render('index', { title: 'Express', data: dbResult });

  return true;

});

/** test page 보여주기 **/
/** 나중에 추가로 넣고싶은 페이지 있으면 해당 코드 복사해서 사용하면 됨 **/
router.get('/test/index', async function(req, res, next) {
  res.render('test/index', { title: 'Express' });
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
