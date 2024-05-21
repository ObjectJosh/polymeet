# Contributing

### Coding Standards

- Follow our [Style Guide](./STYLE_GUIDE.md).

### Setting Up Your Development Environment

1. **Install Prettier**

   Ensure Prettier is installed and configured in your IDE.

   - For **VSCode**, install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
   - For **WebStorm**, follow the [JetBrains Prettier Configuration](https://www.jetbrains.com/help/webstorm/prettier.html).

   Configure Prettier to format on save:
   - **VSCode**: Add the following settings to your `settings.json`:

     ```json
     {
       "editor.formatOnSave": true,
       "prettier.requireConfig": true
     }
     ```

2. **Install ESLint**

   Ensure ESLint is installed and configured in your IDE.

   - For **VSCode**, install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.
   - For **WebStorm**, follow the [JetBrains ESLint Configuration](https://www.jetbrains.com/help/webstorm/eslint.html).

   Configure ESLint to run on save:
   - **VSCode**: Add the following settings to your `settings.json`:

     ```json
     {
       "eslint.validate": [
         "javascript",
         "javascriptreact",
         "typescript",
         "typescriptreact"
       ],
       "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true
       }
     }
     ```

3. **Commit Messages**

   Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

### How to Submit a Pull Request

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Ensure your changes adhere to the coding standards.
5. Commit your changes (`git commit -m 'feat: add new feature'`).
6. Push to the branch (`git push origin feature-branch`).
7. Open a Pull Request.

Happing coding!
