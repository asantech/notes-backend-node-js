const ServerCodeStructures = require('../models/server-code-structure');

const getServerCodeStructure = async (req,res,next)=>{
    const serverCodeStructure = await ServerCodeStructures.find().exec();
    res.json(serverCodeStructure);
}

const updateServerCodeStructure = async (req,res,next)=>{
    
    let updatedServerCodeStructure = await ServerCodeStructures.findOneAndUpdate({
        id: '62207c159084aadbcd340369', // بعداً اصلاح شود
    }, {
        structure: req.body.structure,
    });

    res.status(200).json(updatedServerCodeStructure);
}

exports.updateServerCodeStructure = updateServerCodeStructure;
exports.getServerCodeStructure = getServerCodeStructure;