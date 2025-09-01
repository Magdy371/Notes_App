import {Request , Response} from 'express';
import Note from '../models/Note';

export const getNotes = async (req:Request, res:Response)=>{
    const notes = await Note.find();
    res.json(notes);
}

export const createNote = async(req:Request, res:Response)=>{
    const {title, content} = req.body;
    const newNote = new Note({title, content});
    await newNote.save();
    res.status(201).json(newNote);
}

export const deleteNote = async (req:Request, res:Response)=>{
    const {id} = req.params;
    await Note.findByIdAndDelete(id);
    res.json({message:"Note is deleted"});
}
