import { Router } from 'express';
import {register,login,getProfile} from '../controllers/authController.js';
import {registerValidationRules,loginValidationRules,handleValidationErrors,} from '../middlewares/validationMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', registerValidationRules, handleValidationErrors, register);
router.post('/login', loginValidationRules, handleValidationErrors, login);
router.get('/me', protect, getProfile);

export default router;
