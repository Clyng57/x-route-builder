
# x-route-builder

A light-weight utility for creating file based routing in frameworks like express.


## Features:

- File-based routing.
- Can ignore files.
- Can alter the file's route that is created.
- Dynamic routes (`req.params`) - File:`[id].js` - Will be altered to `/:id`.
- Fully customizable.
- Will log the output if in development env.

<br />

# Table of Contents
1. [ Install ](#install) <br />
2. [ Usage ](#examples) <br />

<br />

<a name="install"></a>
## Install

```console
npm i x-route-builder 
```

<br />

<a name="examples"></a>
## Usage


### CommonJS Module or ES Module:

```js
// CommonJS
const XrouteBuilder = require('x-route-builder')
// ES
import XrouteBuilder from '../router-config';
```


### Standard:

```js
const XrouteBuilder = require('x-route-builder')

// create the route builder passing in (app)
const xRouteBuilder = new XrouteBuilder({
  app: app,
})

// create the routes
xRouteBuilder.create()
```


### Options:

```js
const XrouteBuilder = require('x-route-builder')

// create the route builder passing in (app & options)
const xRouteBuilder = new XrouteBuilder({
  // app
  app: app,
  // directory path to start reading and building routes in
  dirpath: path.join(__dirname, 'routes'),
  // base path to start routes from
  basepath: '/basepath',
  // files to ignore
  ignore: [
    'ignoreFile1.js', 'ignoreFile2.js'
    ],
  // files to change / keep index of new route names the same as files
  change: {
    file: [
      'file1.js', 'file2.js'
    ],
    new: [
      'newFile1Path', 'newFile2Path'
    ],
  }
})

// create the routes
xRouteBuilder.create()
```

