import { Router } from "express";
import { authenticate } from "../Middleware/Auth.ts";
import { admin } from "../Middleware/Role.ts";
import UsersController from "../Controller/UsersController.js";

const router = Router();
const controller = new UsersController();

router.get('/', controller.getAllUsers);
router.get("/home", controller.getStats);
router.get('/:id', controller.getById);
router.get('/auth/logout', controller.destroySession);
router.post('/', controller.createUser);
router.post('/auth', controller.auth);
router.post('/send-reset-link', controller.sendResetToken);
router.patch('/reset-password/:token', controller.resetPassword);
router.delete('/:id', controller.deleteUser);
router.put("/:id", controller.updateUser);

export default router;