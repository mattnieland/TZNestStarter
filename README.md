# NestJS Starter

## 📓 Commands

### Commands Description

```bash
# build the app
$ pnpm build

# format the code
$ pnpm lint

# start the app
$ pnpm start

# run in development mode
$ pnpm start:dev || pnpm dev

# build the app and run it in production mode
$ pnpm start:prod || pnpm prod

# generate Swagger JSON schema
$ pnpm swagger

# test both unit test and e2e test
$ pnpm test

# test all the e2e test
$ pnpm test:e2e

# test all the unit test
$ pnpm test:unit
```

### Running Application for Development

```bash
$ git clone <repo>

$ pnpm install

# Fill in require information in .env file
$ cp .env.example .env

# Linux / Mac users may require (allow git hook script executable)
$ chmod +x .husky -R

$ pnpm dev
```

## 📁 Project Structure

```text
├── ci
│   ├── docker-compose.yaml
│   └── Dockerfile
├── .husky
│   ├── _
│   │   ├── .gitignore
│   │   └── husky.sh
│   ├── commit-msg
│   ├── pre-commit
│   └── pre-push
├── src
│   ├── exception
│   │   ├── index.ts
│   │   └── normal.exception.ts
│   ├── filter
│   │   ├── all-exception.filter.ts
│   │   ├── index.ts
│   │   ├── normal-exception.filter.ts
│   │   └── validator-exception.filter.ts
│   ├── interceptor
│   │   └── response.interceptor.ts
│   ├── modules
│   │   ├── app
│   │   │   ├── dto
│   │   │   │   ├── response
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── version.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.spec.ts
│   │   │   ├── app.service.ts
│   │   │   └── index.ts
│   │   └── http
│   │       ├── http.module.ts
│   │       └── http.service.ts
│   ├── shared
│   │   ├── enums
│   │   │   ├── index.ts
│   │   │   ├── log-level.ts
│   │   │   └── node-env.ts
│   │   ├── interfaces
│   │   │   ├── index.ts
│   │   │   └── response.ts
│   │   └── constants.ts
│   ├── utils
│   │   ├── clustering.ts
│   │   ├── helper.ts
│   │   └── swagger.ts
│   ├── env.d.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── common.ts
│   └── jest.e2e.config.ts
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── .commitlintrc.js
├── .dockerignore
├── .editorconfig
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── jest.config.ts
├── .lintstagedrc.js
├── nest-cli.json
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── .prettierrc.js
├── README.md
├── tsconfig.json
└── webpack.config.js
```

## License

This project is licensed under the MIT License, Copyright © 2023 Matt Nieland. See [LICENSE](./LICENSE) for more information.
