"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
// מיובא מ-config/database.ts
var database_1 = require("./config/database");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(database_1).default; } });
