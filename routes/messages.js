// /api/messages

// api/users

const {Router} = require('express');
const { getChats } = require('../controllers/messages');
const {validateJWT} = require('../middlewares/validateJWT');

const router = Router();

router.get('/:from',validateJWT,getChats);

module.exports = router;