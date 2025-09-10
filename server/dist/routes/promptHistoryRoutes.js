"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promptHistoryController_1 = require("../controllers/promptHistoryController");
const router = (0, express_1.Router)();
router.post('/', promptHistoryController_1.savePromptHistory);
router.get('/:userId', promptHistoryController_1.getUserHistory);
router.delete('/:userId', promptHistoryController_1.clearUserHistory);
exports.default = router;
