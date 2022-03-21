module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    rules: {
        'vue/require-default-prop': 'off',
        'space-before-function-paren': 0,
        always: 0,
        exceptAfterSingleLine: 0,
        // 设置一行的最大长度
        'max-len': [2, 120],
        // 设置文件的最大行数
        'max-lines': [2, 700],
        // 设置function里面允许的代码行数量
        'max-statements': [2, 120],
        // 关键字前后空格
        'keyword-spacing': 2,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-mutating-props': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/v-on-event-hyphenation': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ]
    },
    settings: {}
}
