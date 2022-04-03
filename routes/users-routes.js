const express = require('express');
const {check} = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post('/',usersController.logInUser);

router.get('/all',usersController.getUsers);

router.get('/:id',usersController.getUserById);

router.get('/nationalCode/:code',usersController.getUserByNationalCode);

router.post(
    '/sign-up',
    [
        check('username').not().isEmpty(),
        check('firstName').not().isEmpty(),
        check('lastName').not().isEmpty(),
        check('password').not().isEmpty().isLength({min:5})
    ],
    usersController.signUp
);

router.post('/log-in',usersController.logIn);

router.patch('/:id',usersController.updateUser);

router.delete('/:id',usersController.delUser);

module.exports = router;