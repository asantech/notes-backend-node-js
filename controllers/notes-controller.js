const HttpErr = require('../models/http-err');
const Note = require('../models/note');

let DUMMY_NOTES = [];

const createNote = async (req,res,next)=>{
    const {scopeId,title,type,srcTypeId,srcName,srcURL,note} = req.body;

    const createdNote = new Note({
        scopeId,
        title,
        type,
        srcTypeId,
        srcName,
        srcURL,
        note,
    });
    
    const result = await createdNote.save();
    res.status(201).json(result);
}

const getNotes = async (req,res,next)=>{
    const notes = await Note.find().exec();

    if(notes.length === 0)
        return next(new HttpErr('No notes have been created yet.',404));
        
    res.json(notes);
}

const updateNote = (req,res,next)=>{
    const {title,type,srcTypeId,srcName,srcURL,note} = req.body;
    const noteId = req.params.id;

    const updateNote = { ...DUMMY_NOTES.find(note => note.id === noteId)};
    const scopeIndex = DUMMY_NOTES.findIndex(note => note.id === noteId);
    
    if(scopeIndex == -1)
        return next(new HttpErr('Could not find a user for the provided user id to update.',404));
        
    updateNote.title = title;
    updateNote.type = type;
    updateNote.srcTypeId = srcTypeId;

    if(srcName)
        updateNote.srcName = srcName;
    else
        delete updateNote.srcName;
     
    if(srcURL)
        updateNote.srcURL = srcName;
    else
        delete updateNote.srcURL;

    updateNote.note = note;

    DUMMY_NOTES[scopeIndex] = updateNote;

    res.status(200).json(updateNote);
}

const delNote = (req,res,next)=>{

    const noteId = req.params.id;

    DUMMY_NOTES = DUMMY_NOTES.filter(note => note.id !== noteId);
 
    res.status(200).json(DUMMY_NOTES);
}

exports.createNote = createNote;
exports.getNotes = getNotes;
exports.updateNote = updateNote;
exports.delNote = delNote;