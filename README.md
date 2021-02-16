## Create NodeJS App

### How to install
```
npx @hermawan22/create-nodejs-app <name-of-project>
or
npm install -g @hermawan22/create-nodejs-app
or
yarn global add @hermawan22/create-nodejs-app
```

### Initial setup
- Rename `.env.example` to be `.env`
- If want use database connection on .env, change FEATURE_FLAGS value of withDatabase to be `true`

### How to run

```
create-nodejs-app <name-of-project>
cd <name-of-project>
yarn install
yarn dev
```

### Structure of project
- I grouped the code based on modules (e.g user and auth in this boilerplate, try look into `modules` folder)
- Routes is at `routes.ts`, simply create instance and pass path arguments to used by modules (see example at `modules` folder)