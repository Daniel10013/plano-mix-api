import { Router } from "express";
import { authenticate } from '../Middleware/Auth';
import ShoppingController from '../Controller/ShoppingController';

const router = Router()
const controller = new ShoppingController();

router.get("/", authenticate, controller.getAllShopping);
router.get("/:id", authenticate, controller.getShoppingById);
router.get("/analytics/store/classification/:id", authenticate, controller.getAnalyticsClassification);
router.post("/", authenticate, controller.createShopping);
router.put("/:id", authenticate, controller.updateShopping);
router.delete("/:id", authenticate, controller.deleteShopping);


export default router;