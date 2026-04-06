const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   GET /api/staff
// @desc    获取所有员工账号列表
// @access  Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const staff = await User.find({ role: { $in: ['admin', 'staff'] } })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @route   POST /api/staff
// @desc    创建员工子账号
// @access  Admin
router.post(
  '/',
  protect,
  admin,
  [
    body('name', '姓名不能为空').not().isEmpty(),
    body('email', '请输入有效的邮箱地址').isEmail(),
    body('password', '密码至少6位').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, permissions } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: '该邮箱已被注册' });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: 'staff',
        phone,
        permissions: permissions || {
          vehicles: true,
          inquiries: true,
          homepage: false,
          settings: false,
        },
        isActive: true,
        createdBy: req.user._id,
      });

      const created = await User.findById(user._id).select('-password');
      res.status(201).json(created);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '服务器错误' });
    }
  }
);

// @route   PUT /api/staff/:id
// @desc    更新员工信息（权限/状态/姓名等）
// @access  Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 不能修改自己的角色
    if (user._id.toString() === req.user._id.toString() && req.body.role) {
      return res.status(400).json({ message: '不能修改自己的角色' });
    }

    const { name, email, phone, permissions, isActive, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (permissions) user.permissions = permissions;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (password && password.length >= 6) user.password = password;

    const updated = await user.save();
    const result = await User.findById(updated._id).select('-password');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @route   DELETE /api/staff/:id
// @desc    删除员工账号
// @access  Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    // 不能删除自己
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: '不能删除自己的账号' });
    }

    // 不能删除其他管理员
    if (user.role === 'admin') {
      return res.status(400).json({ message: '不能删除管理员账号' });
    }

    await user.deleteOne();
    res.json({ message: '员工账号已删除' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// @route   PUT /api/staff/:id/toggle
// @desc    启用/禁用员工账号
// @access  Admin
router.put('/:id/toggle', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: '不能禁用自己' });
    }

    user.isActive = !user.isActive;
    await user.save();
    const result = await User.findById(user._id).select('-password');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
