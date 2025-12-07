import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isVerify = await bcrypt.compare(req.body.password, user.password);

    if (!isVerify) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    const { password, _id, fullName, email, createdAt, updatedAt } = user._doc;
    res.status(200).json({
      _id,
      fullName,
      email,
      createdAt,
      updatedAt,
      token,
    });
  } catch (error) {
    res.status(404).json({
      message: "Пользователь не найден",
    });
  }
};

export const register = async (req, res) => {
  try {
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(pass, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      password: passwordHash,
      awatarUrl: req.body.awatarUrl,
    });
    const user = await doc.save();
    const { password, ...userData } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Success",
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};
