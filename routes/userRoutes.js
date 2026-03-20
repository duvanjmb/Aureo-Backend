import { Router } from "express";
import { listUsers, getUser, deleteUser } from "../controllers/userController.js";   

const router = Router();


router.get("/", listUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
    