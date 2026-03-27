import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("health check");
});

export default router;
