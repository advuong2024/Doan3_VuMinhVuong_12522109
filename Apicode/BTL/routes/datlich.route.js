var express = require('express');
var router = express.Router();
const datlichController = require("../controllers/datlich.controller");
router.get('/Today', datlichController.getToday)
router.put('/trangthai/:id', datlichController.updateStatus);
router.get('/', datlichController.getAll);
router.get('/:id',  datlichController.getById);
router.post('/',  datlichController.insert);
router.put('/:id',  datlichController.update);
router.delete('/:id', datlichController.delete);
module.exports = router;
