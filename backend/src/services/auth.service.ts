import { UpdateProfileDto } from "../dtos";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";
import UserModel from "../models/user.model";
import { ComparePassword, HashPassword } from "../utils/password";
import jwt from "jsonwebtoken";

export const register = async (dto: RegisterDto) => {
  const { fullName, email, password } = dto;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = await UserModel.create({
    fullName,
    email,
    password: await HashPassword(password),
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
};

export const login = async (dto: LoginDto) => {
  const { email, password } = dto;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User not exists");
  }
  const isPasswordCorrect = await ComparePassword(
    password,
    user.password as string
  );
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
};

export const updateProfile = async (userId: string, dto: UpdateProfileDto) => {
  return await UserModel.findByIdAndUpdate(
    userId,
    { fullName: dto.fullName, avatar: dto.avatar },
    { new: true }
  );
};

const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "1day",
  });
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "");
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
