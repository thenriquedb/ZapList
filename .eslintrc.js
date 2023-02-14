module.exports = {
  env: {
    "es2021": true,
    "node": true,
    "jest": true
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module",
    project: 'tsconfig.json',
  },
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-import-helpers",
    "prettier",
  ],
  rules: {
    "camelcase": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-shadow": "off",
    "no-console": "off",
    'no-use-before-define': "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "lines-between-class-members": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          "module",
          "/^[A-Z]/",
          [
            "parent",
            "sibling",
            "index",
          ],
        ],
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*.spec.ts",
          "**/*.seeder.ts",
          "**/*.spec.tsx",
          "**/*.stories.tsx",
        ]
      }
    ],
    "prettier/prettier": [
      "error",
      {},
      {
        "usePrettierrc": true
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": [
          "PascalCase"
        ],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "lines-between-class-members": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "max-len": [
      1,
      160,
      2
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          "module",
          "/^@/",
          [
            "parent",
            "sibling",
            "index"
          ]
        ],
      }
    ],
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    },
  }
}