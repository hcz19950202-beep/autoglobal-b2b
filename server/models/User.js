const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['admin', 'staff', 'buyer'],
      default: 'buyer',
    },
    // 员工权限（仅 staff 角色使用）
    permissions: {
      vehicles: { type: Boolean, default: false },    // 车辆管理
      inquiries: { type: Boolean, default: false },   // 询盘管理
      homepage: { type: Boolean, default: false },    // 首页装修
      settings: { type: Boolean, default: false },    // 系统设置
    },
    company: { type: String },
    country: { type: String },
    phone: { type: String },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user has specific permission
userSchema.methods.hasPermission = function (permission) {
  if (this.role === 'admin') return true; // admin 拥有所有权限
  if (this.role === 'staff') return this.permissions?.[permission] === true;
  return false;
};

module.exports = mongoose.model('User', userSchema);
