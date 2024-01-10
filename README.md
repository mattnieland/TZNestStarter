# tzneststarter

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

# tests
$ pnpm test
```

### Running Locally

You'll need to add in a .env.dev file. To do this, we're going to use Doppler CLI where the secrets are stored.

If on Windows, open a terminal and execute this command:

```bash
winget install doppler
```

If on MacOS/Linux, open a terminal and execute this command:

```bash
(curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh || wget -t 3 -qO- https://cli.doppler.com/install.sh) | sudo sh
```

Test that Doppler CLI is installed with this command:

```bash
doppler --version
```

Next, navigate to the folder this README.md file sits in and open a terminal, then execute this command:

```bash
echo 'REPLACE_WITH_DOPPLER_TOKEN' | doppler configure set token
```

REPLACE_WITH_DOPPLER_TOKEN will need to be pulled from LastPass for the project in question. This will log you in to that project's secrets.

Next, set the project and environment by issuing this command:

```bash
doppler setup --project project-name --config staging
```

You only need to set this up once, then you can refresh the secrets anytime with this command:

```bash
doppler secrets download --format=env --no-file > .env.dev
```

Note: On Windows PCs, you'll need to adjust the .env.dev file to be UTF-8 encoding for env-cmd to read it correctly.

Finally, you need to create a .npmrc file with credentials to access the organization's private packages.

```bash
enable-pre-post-scripts=true
@destify-dev:registry=https://gitlab.com/api/v4/groups/78245221/-/packages/npm/
//gitlab.com/:_authToken=TOKEN
```

Replacing TOKEN with the value for "GitLab Package Registry Group PAT" in LastPass' "Shared - Odyssey Dev" folder.

### Running Application for Development

```bash
$ git clone <repo>

$ pnpm install

# Linux / Mac users may require (allow git hook script executable)
$ chmod -R +x .husky

$ pnpm dev

## License

This project is licensed under the MIT License, Copyright © 2023 Matt Nieland. See [LICENSE](./LICENSE) for more information..
```
