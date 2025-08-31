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
exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileName = file.fieldname + "-" + uniqueSuffix + ".jpg";
        console.log("Saving file as:", fileName);
        cb(null, fileName);
    },
});
exports.uploadSingle = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var ext = file.mimetype;
            if (ext !== "image/jpeg" &&
                ext !== "image/jpg" &&
                ext !== "image/gif" &&
                ext !== "image/png") {
                return callback(new Error("Only images are allowed"));
            }
            callback(null, true);
        });
    },
    limits: { fileSize: 1048576 },
}).single("singleImage");
