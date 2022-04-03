const HttpErr = require('../models/http-err');
const ElementNote = require('../models/element-note');

const getElements = async (req,res,next)=>{

    const allElements = await ElementNote.find().exec();

    if(!allElements)
        return next(new HttpErr('No elements for settings notes have been created yet.',404)); 
        
    res.json(allElements);
}

const getElementNote = async (req,res,next)=>{
    const {elementNoteLocation,elementNoteName} = req.body;
    const elementsNotes = await ElementNote.find().exec();
    const elementNote = elementsNotes.find(elementData =>{
        return (
            elementNoteLocation === elementData.location &&
            elementNoteName === elementData.name
        );
    });

    if(!elementNote)
        return next(new HttpErr('The notable element you are looking for couldn\'nt be found.',404));
        
    res.json(elementNote);
}

const updateElementNote = async (req,res,next)=>{
    const {elementNoteLocation,elementNoteName,note} = req.body;;
    const elementsNotes = await ElementNote.find().exec();
    const elementNote = elementsNotes.find(elementData =>{
        return (
            elementNoteLocation === elementData.location &&
            elementNoteName === elementData.name
        );
    });

    if(!elementNote)
        return next(new HttpErr('The notable element not found to update.',404));
        
    elementNote.note = note;
    await elementNote.save();
    res.status(200).json(elementNote);
}

exports.getElements = getElements;
exports.getElementNote = getElementNote;
exports.updateElementNote = updateElementNote;