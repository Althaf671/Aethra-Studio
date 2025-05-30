import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default [
  next(),

  // rules / plugins lain…

  {
    ignores: [
      '**/node_modules/**',
      '**/prisma/generated/**',
      '**/@prisma/**',
    ],
  },

  // override rule untuk file yg tetap kena lint (opsional)
  {
    files: ['**/@prisma/**', '**/prisma/generated/**'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
