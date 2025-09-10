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
const database_1 = __importDefault(require("../config/database"));
const models_1 = require("../models");
function clearPrompts() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        try {
            const result = yield models_1.Prompt.deleteMany({});
            console.log(`נמחקו ${result.deletedCount} פרומפטים מהמסד`);
            if (result.deletedCount === 0) {
                console.log('לא היו פרומפטים למחיקה');
            }
            else {
                console.log('כל הפרומפטים נמחקו בהצלחה!');
            }
        }
        catch (error) {
            console.error('שגיאה במחיקת פרומפטים:', error);
        }
        process.exit(0);
    });
}
clearPrompts().catch(err => {
    console.error('שגיאה:', err);
    process.exit(1);
});
