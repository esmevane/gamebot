// Allows generators and other ES6+ functionality.
//
import 'babel-polyfill'

// Node system libs.
//
import { resolve } from 'path'
import fs from 'fs'

const join = (...elements) => elements.join(`/`)

// Express and Express middleware.
//
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// Required for custom implementations of some below routes.
//
import webpack from 'webpack'
import DevServer from 'webpack-dev-server'
import config from '../webpack.config'
import proxy from 'proxy-middleware'
import url from 'url'

const Environment = process.env.NODE_ENV || `development`
const appHost = `http://localhost:${config.meta.port - 1}`
const scripts = `http://localhost:${config.meta.port}/assets`
const appPath = resolve(join(__dirname, `..`, `app`))
const secret = `it's really not all that secret right now`
const index = resolve(join(appPath, `index.html`))
const assetUri = `${appHost}/assets`

// The main Express server, which will proxy /assets/ to Webpack unless in
// production environment.
//
let app = express()

app.set(`secret`, secret)

// Middleware in use:  Body parser, basic auth, morgan logging.
//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan(`common`))

if (Environment === `production`) {
  app.use(`/assets`, express.static(`${appPath}/assets`))
} else {
  app.use(`/assets`, proxy(url.parse(scripts)))
}

// Statically permit images, and also do a little trick work to bootstrap the
// favicon (which needs to be expanded for other app interfaces).
app.use(`/images`, express.static(`${appPath}/images`))
app.use(`/fonts`, express.static(`${appPath}/fonts`))
app.get(`/favicon.ico`, (request, response) => {
  const file = resolve([ appPath, `images`, `favicon.ico` ].join(`/`))

  response.sendFile(file)
})

// All unscripted routes immediately defer to the index route, which has an
// internal route handler on the client side.
//
app.get(`*`, (request, response) => response.sendFile(index))

if (Environment !== `test`) {
  // We open the central app on the base port.
  //
  app.listen(config.meta.port - 1)

  // Webpack Development Server:  Build and manage script assets.
  //
  if (Environment !== `production`) {
    let devServerOptions = {
      contentBase:        resolve(appPath),
      publicPath:         config.output.publicPath,
      hot:                true,
      cached:             false,
      cachedAssets:       false,
      historyApiFallback: true,
      stats:              { colors: true, chunkModules: false }
    }

    let devServer = new DevServer(webpack(config), devServerOptions)

    devServer.listen(config.meta.port, `localhost`, () => {})
  }
}
