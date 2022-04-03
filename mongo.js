const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb+srv://WebDev1976:1234@notes.sjf7z.mongodb.net/notes?retryWrites=true&w=majority';

const createScope = async (req,res,next) => {
    const newScope = {
        name: req.body.name
    };
    const client = new MongoClient(url);
    
    try{
        await client.connect();
        const db = client.db();
        await db.collection('scopes').insertOne(newScope);
    }catch(err){
        return res.json({
            message: 'Could not connect to server',
        });
    }

    client.close();

    res.json(newScope);
};

const getScopes = async (req,res, next) => {

    const client = new MongoClient(url);

    let scopes;

    try{
        await client.connect();
        const db = client.db();
        scopes = await db.collection('scopes').find().toArray();
    }catch(err){
        return res.json({
            message: 'Could not retrieve products',
        });
    }
    client.close();

    res.json(scopes);
}

exports.createScope = createScope;
exports.getScopes = getScopes;