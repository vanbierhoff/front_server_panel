module.exports = {
    root: true,
    extends: "../../../.eslintrc.js",
    overrides: [
        {
            files: ["*.ts", "*.js"],
            parserOptions: {
                project: [
                    "../../../tsconfig.json"
                ],
                ecmaVersion: "latest",
                createDefaultProgram: true,
                env: {
                    es6: true
                },
            },
            extends: ["plugin:@angular-eslint/recommended"],
            rules: {}
        },
        {
            files: ["*.component.html"],
            rules: {}
        },
        {
            files: ["*.component.ts"],
            rules: {}
        }
    ]
}
