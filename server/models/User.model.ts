import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [30, 'Name cannot exceed 30 characters'],
    minlength: [4, 'Name must be atleast 4 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: 'Change later in Schema',
    },
    secure_url: {
      type: String,
      required: true,
      default: 'Change later in Schema',
    },
  },
  role: {
    type: Number,
    enum: [ROLES_LIST.ADMIN, ROLES_LIST.MODERATOR, ROLES_LIST.USER],
    default: ROLES_LIST.USER,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },

  // Maybe move this to Token schema if I create one later
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods = {
  createAccessToken: async function () {
    return await jwt.sign(
      { _id: this._id, role: this.role },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  },
  createRefreshToken: async function () {
    return await jwt.sign(
      { _id: this._id, role: this.role },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  },
  comparePassword: async function (plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  },
};

export default mongoose.model('user', userSchema);
