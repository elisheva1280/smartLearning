"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add logging middleware
app.use((req, res, next) => {
    console.log(`=== ${req.method} ${req.path} ===`);
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    next();
});
// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Test route
app.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.json({ message: 'Server is working!' });
});
app.use('/api', routes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Start server first
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    // Connect to DB in background
    (0, db_1.default)();
});
startServer();
