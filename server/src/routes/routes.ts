import express from "express";

const router = express.Router();

router.post("/capture", require("./capture/capture.route"));
router.post("/capture/move", require("./capture/move.route"));
router.get("/capture/list", require("./capture/list.route"));

router.get("/logs", require("./log/log.route"));

export { router as routes };
