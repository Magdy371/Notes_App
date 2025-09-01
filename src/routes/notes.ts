import {Router} from 'express';
import {getNotes , createNote, deleteNote} from "../controllers/noteController";

const router = Router();

router.get('/',getNotes);
router.post('/',createNote);
router.delete('/:id',deleteNote);
export default router;