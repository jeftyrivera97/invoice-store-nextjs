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
  {
    rules: {
      // Permitir expresiones sin usar como statements válidos
      "@typescript-eslint/no-unused-expressions": "warn",
      // Permitir this como variable (común en JavaScript)
      "@typescript-eslint/no-this-alias": "warn",
      // Configuraciones adicionales para un proyecto más permisivo
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
      "@typescript-eslint/no-unnecessary-type-constraint": "warn",
      // React hooks
      "react-hooks/exhaustive-deps": "warn",
      // Reglas para imports
      "import/no-unresolved": "off",
      // React específico
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
    },
  },
  // Configuración específica para archivos generados
  {
    files: ["**/src/generated/**/*", "**/prisma/**/*"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
    },
  },
];

export default eslintConfig;
