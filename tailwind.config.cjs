/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  corePlugins: {
    'preflight': false // 部分样式层叠掉了semi中默认样式，这里禁用，通过preflight.css引入，在其中删除冲突样式
  },
  plugins: [],
}