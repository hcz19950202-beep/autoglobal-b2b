const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: '用户不存在' });
      }
      if (!req.user.isActive) {
        return res.status(403).json({ message: '账号已被禁用，请联系管理员' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: '认证失败，请重新登录' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '未登录，请先登录' });
  }
};

// 仅管理员
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: '需要管理员权限' });
  }
};

// 管理员或员工（后台登录权限）
const adminOrStaff = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
    next();
  } else {
    res.status(403).json({ message: '需要后台登录权限' });
  }
};

// 检查特定权限
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.user && req.user.hasPermission(permission)) {
      next();
    } else {
      res.status(403).json({ message: `没有${permission}操作权限` });
    }
  };
};

module.exports = { protect, admin, adminOrStaff, requirePermission };
