let backendMode;

(async function GetServerCodeType(){

    let currentServerCodeType;
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(
        'mongodb+srv://WebDev1976:1234@notes.sjf7z.mongodb.net/notes?retryWrites=true&w=majority'
    );
    
    try{
        await client.connect();
        const db = client.db();
        currentServerCodeType = (await db.collection('servercodestructures').find().toArray())[0]; // این روش بعداً اصلاح شود
        backendMode = currentServerCodeType.structure;

        let mongo;
        let mongoose;
        let mongooseConnection;

        const express = require('express');
        const bodyParser = require('body-parser');

        const HttpErr = require('./models/http-err');

        if(backendMode === 'mongo')
            mongo = require('./mongo');
        else if(backendMode === 'mongoose'){
            mongoose = require('./mongoose');
            mongooseConnection = require('mongoose');
        }

        const usersRoutes = require('./routes/users-routes');
        const scopesRoutes = require('./routes/scopes-routes');
        const notesRoutes = require('./routes/notes-routes');
        const elementsNotesRoutes = require('./routes/elements-notes-routes');
        const serverCodeStructureRoutes = require('./routes/server-code-structure-routes');

        const app = express();

        app.use(bodyParser.json());

        app.use((req,res,next) => {
            res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-type, Accept, Authorization'
            );
            res.setHeader('Access-Control-Allow-Methods','PATCH','POST','GET','DELETE');
            next();
        });

        app.use('/api/users',usersRoutes);
        app.use('/api/scopes',scopesRoutes);
        app.use('/api/notes',notesRoutes);
        app.use('/api/elements-notes',elementsNotesRoutes);
        app.use('/api/server-code-structure',serverCodeStructureRoutes);

        if(backendMode === 'mongo'){
            app.post('/add-scope',mongo.createScope);
            app.get('/add-scope',mongo.getScopes);
        }
        else if(backendMode === 'mongoose'){
            app.post('/add-scope',mongoose.createScope);
            app.get('/add-scope',mongoose.getScopes);
        }
        
        app.use((req,res,next) => { // بررسی شود که چرا این میدلور بالاتر از میدلور پایینی قرار گرفته است
            const err = new HttpErr('Could not find this route',404);
            throw err;
        });

        app.use((err,req,res,next) => {
            if(res.headersSent)
                return next(err);
            
            res.status(err.code || 500);
            res.json({
                message: err.message || 'An unknown error occured!' 
            });
        });
 
        if(backendMode === 'mongoose')
            mongooseConnection
                .connect('mongodb+srv://WebDev1976:1234@notes.sjf7z.mongodb.net/notes?retryWrites=true&w=majority')
                .then(() => {
                    app.listen(5000);
                })
                .catch((err) => {
                    console.log(err);
                })
            ;
    }catch(err){

    }
    client.close();
})();