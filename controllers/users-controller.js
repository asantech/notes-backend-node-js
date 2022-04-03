const HttpErr = require('../models/http-err');
const {validationResult} = require('express-validator');

const User = require('../models/user');

let DUMMY_USERS = [
    {
        id: '0001',
        username: 'web_dev',
        firstName: 'Mohammad Hossein',
        lastName: 'Moayeri',
        imgURL: '',
        age: 32,
        nationalCode: '2110032812',
        password: 'easyTech',
    },
    {
        id: '0002',
        username: 'BobMartin',
        firstName: 'Bob',
        lastName: 'Martin',
        imgURL: '',
        age: 69,
        nationalCode: '2110032800',
        password: 'cleanCode',
    },
    {
        id: '0003',
        username: 'alan_turing',
        firstName: 'Alan',
        lastName: 'Turing',
        imgURL: '',
        age: 41,
        nationalCode: '2110032700',
        password: 'anigma',
    }
];

const logInUser = async (req,res,next)=>{

    const {username,password} = req.body;
    const users = await User.find().exec();

    const user = users.find(userData =>{
        return (
            userData.username === username &&
            userData.password === password
        );
    });

    if(!user)
        return next (new HttpErr('Could not find a user for the provided username & password.',404));

    res.status(200).json(user);
}

const getUserById = (req,res,next)=>{

    const userId = req.params.id;
    const user = DUMMY_USERS.find(p =>{
        return p.id === userId;
    });

    if(!user)
        return next(new HttpErr('Could not find a user for the provided user id.',404));
        
    res.status(200).json({user});
}

const getUserByNationalCode = (req,res,next)=>{
    const userNationalCode = req.params.code;
    const user = DUMMY_USERS.find(p =>{
        return p.nationalCode === userNationalCode;
    });

    if(!user)
        return next(new HttpErr('Could not find a user for the provided user national code.',404));
        
    res.status(200).json({user});
}

const getUsers = (req,res,next)=>{
    if(DUMMY_USERS.length === 0)
        return next(new HttpErr('No users have signed up yet.',404));
    
    res.status(200).json(DUMMY_USERS);
}

const signUp = async (req,res,next)=>{
 
    const errs = validationResult(req);
    
    if(!errs.isEmpty())
        return next(new HttpErr('Invalid values passed, please check your data.',422));
        
    const users = await User.find().exec();
    const {username,firstName,lastName,age,password} = req.body;

    const usernameExists = users.findIndex(user => user.username === username);

    if(usernameExists !== -1)
        return next(new HttpErr('This username is already used',422));
        
    let newUser = new User({
        username,
        firstName,
        lastName,
        password,
        age,
    });  
    
    const result = await newUser.save();

    res.status(201).json(result);
}

const logIn = (req,res,next)=>{
    const {username,password} = req.body;
    const logInUser = DUMMY_USERS.find(user => user.username === username);

    if(
        !logInUser ||
        logInUser.password !== password
    )
        return next(new HttpErr('Such a username doesn\'nt exist.',401));
        
    res.status(200).json({
        message: 'logged in.'
    });
}

const updateUser = (req,res,next)=>{
    const userId = req.params.id;

    const updateUser = { ...DUMMY_USERS.find(user => user.id === userId)};
    const userIndex = DUMMY_USERS.findIndex(user => user.id === userId);

    if(userIndex == -1)
        return next(new HttpErr('Could not find a user for the provided user id to update.',404));
        
    DUMMY_USERS[userIndex] = updateUser;

    res.status(200).json(updateUser);
}

const delUser = (req,res,next)=>{

    const userId = req.params.id;
    const userIndex = DUMMY_USERS.findIndex(user => user.id === userId);

    if(userIndex == -1)
        return next(new HttpErr('Could not find a user for the provided user id to delete.'));
        
    DUMMY_USERS = DUMMY_USERS.filter(user => user.id !== userId);

    res.status(200).json(DUMMY_USERS);
}

exports.logInUser = logInUser;
exports.getUserById = getUserById;
exports.getUserByNationalCode = getUserByNationalCode;
exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
exports.updateUser = updateUser;
exports.delUser = delUser;