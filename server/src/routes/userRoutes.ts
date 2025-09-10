import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, checkUser } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/check', checkUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;