import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    fullName: {
      type: String,
      require: [true, "Write your name"],
    },
    userName: {
      type: String,
      require: [true, "Emails is require"],
      unique: true,
    },

    password: {
      type: String,
      require: [true, "Set password for user"],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userModel);

export { User };
