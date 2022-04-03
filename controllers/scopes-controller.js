const HttpErr = require('../models/http-err');
const Scope = require('../models/scope');

let DUMMY_SCOPES = [];

const createScope = async (req,res,next)=>{
    const {name,desc} = req.body;

    const createdScope = new Scope({
        name,
        desc,
    });

    const result = await createdScope.save();
    res.status(201).json(result);
}

const getScopes = async (req,res,next)=>{
    const scopes = await Scope.find().exec();

    if(scopes.length === 0)
        return next(new HttpErr('No scopes have been created yet.',404));
        
    res.json(scopes);
}

const updateScope = (req,res,next)=>{
    const {name,desc} = req.body;
    const scopeId = req.params.id;

    const updateScope = { ...DUMMY_SCOPES.find(scope => scope.id === scopeId)};
    const scopeIndex = DUMMY_SCOPES.findIndex(scope => scope.id === scopeId);
    
    if(scopeIndex == -1)
        return next(new HttpErr('Could not find a user for the provided user id to update.',404));
        
    updateScope.name = name;
    updateScope.desc = desc;

    DUMMY_SCOPES[scopeIndex] = updateScope;

    res.status(200).json(updateScope);
}

const delScope = (req,res,next)=>{

    const scopeId = req.params.id;

    DUMMY_SCOPES = DUMMY_SCOPES.filter(scope => scope.id !== scopeId);
 
    res.status(200).json(DUMMY_SCOPES);
}

exports.createScope = createScope;
exports.getScopes = getScopes;
exports.updateScope = updateScope;
exports.delScope = delScope;