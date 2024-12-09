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
exports.logout = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = dto;
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const user = yield user_model_1.default.create({
        fullName,
        email,
        password: yield (0, password_1.HashPassword)(password),
    });
    if (user) {
        const payload = { id: user.id, email: user.email };
        const accessToken = generateToken(payload);
        return {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
            accessToken,
        };
    }
});
exports.register = register;
const login = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = dto;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not exists");
    }
    const isPasswordCorrect = yield (0, password_1.ComparePassword)(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Password is not correct");
    }
    const payload = { id: user.id, email: user.email };
    const accessToken = generateToken(payload);
    return {
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
        },
        accessToken,
    };
});
exports.login = login;
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.logout = logout;
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", {
        expiresIn: "1day",
    });
};
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "");
        return decoded;
    }
    catch (err) {
        throw new Error("Invalid or expired token");
    }
};
