// 用户名校验
export const USERNAME_RULES = [
  { required: true, message: '请输入用户名' },
  { min: 5, max: 20, message: '字符长度在5-20之间' },
  {
    pattern: /^\w+$/,
    message: '只能是字母数字下划线',
  },
]

// 密码校验
export const PASSWORD_RULES = [{ required: true, message: '请输入密码' }]
// 再次输入密码校验
export const CONFIRM_RULES = [{ required: true, message: '请再次输入密码' }]
