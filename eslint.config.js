import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // เพิ่ม Rules ที่ต้องการตั้งค่าเองตรงนี้
      'no-unused-vars': 'off', // ปิดของ JS ปกติ
      '@typescript-eslint/no-unused-vars': ['warn'], // ใช้ของ TS แทน (เตือนเมื่อมีตัวแปรที่ไม่ได้ใช้)
      '@typescript-eslint/no-explicit-any': 'warn', // เตือนเมื่อใช้ any
      'prefer-const': 'error', // บังคับใช้ const ถ้าไม่มีการเปลี่ยนค่าตัวแปร
      'no-console': ['warn', { allow: ['warn', 'error'] }], // เตือนเมื่อใช้ console.log (ยกเว้น warn/error)
    },
  },
)