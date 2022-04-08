const HttpErr = require('../models/http-err');
const Note = require('../models/note');

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

const updateNote = async (req,res,next)=>{
    const noteId = req.body._id;

    let noteData = await Note.findOneAndReplace(
        {
            _id: noteId,
        },
        {
            ...req.body,
            _id: noteId,
        }
    );

    res.status(200).json(noteData);
}

const delNote = async (req,res,next)=>{

    const noteId = req.params.noteId;

    await Note.deleteOne({ _id: noteId });

    const notes = await Note.find().exec();
 
    res.json(notes);
}

exports.createNote = createNote;
exports.getNotes = getNotes;
exports.updateNote = updateNote;
exports.delNote = delNote;