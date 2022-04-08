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
    const {title,type,srcTypeId,srcName,srcURL,note} = req.body;
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

    // noteData = noteData.toObject();

    console.log('noteData 1',noteData);

    // noteData.title = title;
    // noteData.type = type;
    // noteData.srcTypeId = srcTypeId;
    // noteData.title = title;

    console.log('params',title,type,srcTypeId,srcName,srcURL,note);

    // if(srcName)
    //     noteData.name = srcName;
    // else 
    //     noteData.name = undefined;

    // if(srcURL)
    //     noteData.srcURL = srcURL;
    // else 
    //     noteData.srcURL = undefined;

    // noteData.note = note;

    // await noteData.save();

    console.log('noteData 2',noteData);

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