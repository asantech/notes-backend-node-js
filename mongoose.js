const Scope = require('./models/scope');

const createScope = async (req,res,next) => {
    const createdScope = new Scope({
        name: req.body.name,
    });
    const result = await createdScope.save();

    res.json(result);
}

const getScopes = async (req,res, next) => {
    const scopes = await Scope.find().exec();

    res.json(scopes);
}

exports.createScope = createScope;
exports.getScopes = getScopes;