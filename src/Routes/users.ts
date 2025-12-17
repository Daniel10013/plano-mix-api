import { Router } from "express";
import { authenticate } from '../Middleware/Auth';
import { admin } from '../Middleware/Role';
import UsersController from "../Controller/UsersController.js";

const router = Router();
const controller = new UsersController();

router.get('/', controller.getAllUsers);
router.get('/me', authenticate, controller.getMe);
router.get("/home", controller.getStats);
router.get('/:id', controller.getById);
router.get('/auth/logout', controller.destroySession);
router.post('/', authenticate, admin, controller.createUser);
router.post('/auth', controller.auth);
router.post('/send-reset-link', controller.sendResetToken);
router.patch('/reset-password/:token', controller.resetPassword);
router.delete('/:id', authenticate, admin, controller.deleteUser);
router.put("/:id", authenticate, admin, controller.updateUser);

export default router;