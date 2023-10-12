const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['nuxt', 'prettier'],
  globals: {
    useRoute: 'readonly',
    useRouter: 'readonly',
    useHead: 'readonly',
    definePageMeta: 'readonly',
    defineNuxtPlugin: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    ref: 'readonly',
    toRefs: 'readonly',
    watch: 'readonly',
    gql: 'readonly',
    useQuery: 'readonly',
    h: 'readonly',
    navigateTo: 'readonly',
    defineNuxtRouteMiddleware: 'readonly',
    useApollo: 'readonly',
    useRuntimeConfig: 'readonly',
    clearError: 'readonly',
    showError: 'readonly',
    computed: 'readonly',
    watchEffect: 'readonly',
    onMounted: 'readonly',
    useNuxtApp: 'readonly',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', path.resolve(__dirname)]],
        extensions: ['.js', '.vue'],
      },
    },
  },
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'no-plusplus': 'off',
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': ['error', { ignore: ['#components'] }],
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    camelcase: 'off',
  },
}