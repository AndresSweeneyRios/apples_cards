# next_fullstack_template

### Setup
Clone the repository:
```
git clone https://github.com/Andr3wRiv3rs/next_fullstack_template
cd next_fullstack_template
yarn
```

Create a `.env` file with these values:
```env
PORT=3000
PROXY_PORT=3001
```

### Development
```
yarn dev
```
This command uses `concurrently` to run a `nodemon` instance alongside Next.js.


### Production
```
yarn start
```
This command will build your frontend source code statically and export to the `/out` directory.
The static code is then served through `/api/index.js` via `express.static()`.

### Notes
- Pre configured with SASS, Axios, and Chalk
- Contains an example for using <head> in `/pages/_app.js`
- Contains a CSS reset in `/sass/global.sass`, imported by `/pages/_app.js`