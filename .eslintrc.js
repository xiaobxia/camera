/**
 * Created by xiaobxia on 2017/7/12.
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true
  },
  extends: 'eslint:recommended',
  rules: {
    //在条件表达式当中禁止运算符
    'no-cond-assign': ['error', 'except-parens'],
    //禁止if(a),这样的表达
    'no-constant-condition': 'error',
    //禁止重复定义参数
    'no-dupe-args': 'error',
    //禁止在对象中重复定义key
    'no-dupe-keys': 'error',
    //禁止在case中出现重复
    'no-duplicate-case': 'error',
    //禁止块语句内为空
    'no-empty': 'error',
    //禁止多余的判断，如!!!a
    'no-extra-boolean-cast': 'error',
    //控制if后面的在同一行
    'brace-style': ['error', '1tbs', {allowSingleLine: true}],
    //不强制驼峰命名
    camelcase: 'off',
    'comma-spacing': ['error', {before: false, after: true}],
    // 控制逗号在行尾出现还是在行首出现
    'comma-style': ['error', 'last'],
    //关键词的空格
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: {after: true},
        throw: {after: true},
        case: {after: true}
      }
    }],
    //对象中的key，value的空格
    'key-spacing': ['error', {beforeColon: false, afterColon: true}],
    indent: ['error', 2, {SwitchCase: 1, VariableDeclarator: 1}],
    //强制使用全等，除了null
    eqeqeq: ['error', 'allow-null'],
    //不强制点是否可以出现在行的开头
    'dot-location': 'off',
    //尽量使用点
    //'dot-notation': [ 'error', { allowKeywords: true }],
    //在switch中不要有default
    'default-case': ['error', {commentPattern: '^no default$'}],
    //强制分号结尾
    "semi": ['error', "always"]
  }
};
