import express from "express";

const router = express.Router();

router.post("/capture", require("./capture"));
router.post("/capture/move", require("./moveCapture"));
router.get("/capture/list", require("./listCaptures"));

router.get("/logs", require("./log/log.route"));

export { router as routes };
