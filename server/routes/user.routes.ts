import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/user.controllers';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

export default router;
