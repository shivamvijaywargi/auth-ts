import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyUser,
} from '../controllers/user.controllers';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/verify', protect, verifyUser);

export default router;
