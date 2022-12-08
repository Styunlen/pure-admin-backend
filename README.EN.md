<p align="center">
pure-admin-backend-remake-version
<br />
Powered by Node.js
<br/>
**English** | [中文](./README.md)
</p>

## Quick start
### Set the database used by the backend

#### `MySql`

Come to the file `.env` , set an environment variable `DATABASE_TYPE`

Default sqlite
```
DATABASE_TYPE='sqlite'
```

### Installation

```
pnpm install
pnpm run typeorm migration:run -d .\src\config\database.ts
```

### Build and Test

This project is worked by [nodemon](https://github.com/remy/nodemon).
Every change will be hot overloaded

```
pnpm start
```

### `Swagger` host

http://localhost:3000

## Add `token` verification to `Swagger`

① Register an account in `register api`, then login in `login api`,after that ,you will get `accessToken`, copy it.  
② Back to `Swagger`, Click the card bordered in green  in the top right corner `Authorize`, a `Value` text input is in it. Paste `token` prefixed by `Bearer`, then you will see the result.

Pay attention that there is a blackspace after `Bearer`
