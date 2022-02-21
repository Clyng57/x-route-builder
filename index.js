
const fs = require('fs')
const path = require('path')
const chromaPalette = require('chroma-palette')
/**
 * A module that creates a tool for implementing color and formatting for the terminal.
 * @module x-route-builder
 */

/**
 * Class XrouteBuilder - creates a tool for building routes automatically using file-based routing.
 */

class XrouteBuilder {

  /**
   * Create XrouteBuilder
   * 
   * @param {Object} options - contains options
   * @param {string} options.app - required
   * @param {string | undefined} options.dirpath - path to folder to start reading
   * @param {string | undefined} options.basepath - base path to start with
   * @param {string | undefined} options.ignore - ignore these files
   * @param {string | undefined} options.change.file - change this file's route
   * @param {string | undefined} options.change.new - the route name to change file to
   */
  constructor(options) {
    /** @private */
    this.error = ()=> {
      if (!options) {
        console.log(
          chromaPalette
            .red.bold.push('[ERROR:] ')
            .red.push('options is not defined. app, is required.')
            .enter.cyan.push('EXAMPLE:')
            .enter.paint('const xRouteBuilder = new XrouteBuilder({ \n  app: app\,\n})')
        )
        process.exit(1)
      }
      if (!options.app) {
        console.log(
          chromaPalette
            .red.bold.push('[ERROR:] ')
            .red.push('app, is required.')
            .enter.cyan.push('[EXAMPLE:]')
            .enter.paint('const xRouteBuilder = new XrouteBuilder({ \n  app: app\,\n})')
        )
        process.exit(1)
      }
    }
    /** @private */
    this.dircount = 0;
    /** @private */
    this.app = !options ? this.error() : options.app ? options.app : this.error();
    /** @private */
    this.dirpath = options.dirpath ? options.dirpath : path.join(__dirname, 'routes');
    /** @private */
    this.basepath = options.basepath ? options.basepath : '';
    /** @private */
    this.fileRoutes = [];
    /** @private */
    this.ignore = options.ignore ? [].push(...options.ignore) : [];
    /** @private */
    this.change = {
      file: options.change && options.change.new ? ['index.js'].push(...options.change.file) : ['index.js'],
      new: options.change && options.change.new ? [''].push(...options.change.new) : [''],
    }
  }
  /** @private */
  removeJs = f => {
    if (f.includes('.js'))
      return f.replace('.js', '')
    else 
      return f
  }
  /** @private */
  returnPath = (f, change)=> {
    let file = this.removeJs(f);
    if (!change.file.includes(f))
      return file.match(/\[[a-zA-Z]+\]/g) ? ':' + file.match(/[a-zA-Z]+/g) : file;
    else {
      let i = change.file.indexOf(f);
      return change.new[i];
    }
  }
  /** @private */
  parseBasepath = pathTo => {
    let p = pathTo;
    if (p === '')
      return p;
    if (p.includes(/\/$/g))
      p = p.replace(/\/$/g, '')
    if (!p.includes(/^\//g))
      p = '/' + p;
    return p;
  }
  /** @private */
  buildRoutes = (opts)=> {
    let options = {
      dircount: this.dircount + 1,
      dirpath: opts ? opts.dirpath : this.dirpath,
      basepath: opts ? opts.basepath : this.parseBasepath(this.basepath),
      fileRoutes: this.fileRoutes,
      ignore: opts ? opts.ignore : this.ignore,
      change: {
        file: opts ? opts.change.file : this.change.file,
        new: opts ? opts.change.new : this.change.new,
      },
    }
    fs.readdirSync(options.dirpath)
      .forEach(file => {
        if (file === 'index.js' && options.dircount !== 1 || options.ignore.includes(file)) 
          return;
        if (fs.statSync(`${options.dirpath}/${file}`).isDirectory()) {
          let fileRoute = {
            routePath: `${options.basepath}/${file}`,
            route: require(
              path.join(options.dirpath, "/", file)
            ),
          }
          this.fileRoutes.push(fileRoute)
          this.fileRoutes = this.buildRoutes({ 
            dircount: options.dircount,
            dirpath: options.dirpath + '/' + file, 
            basepath: options.basepath + '/' + file, 
            fileRoutes: options.fileRoutes,
            ignore: options.ignore,
            change: {
              file: options.change.file,
              new: options.change.new,
            },
          })
        } else {
          let fileRoute = {
            routePath: options.basepath + "/" + this.returnPath(file, options.change),
            route: require(
              path.join(options.dirpath, "/", file)
            ),
          }
          this.fileRoutes.push(fileRoute)
        }
      })
    return this.fileRoutes;
  }
  /** 
   * Execute and create file-based routes
   */
  create = ()=> {
    let filesArray = this.buildRoutes();
    filesArray.forEach(fileObj => {
      console.log(fileObj.routePath + ' : ' + fileObj.route)
      this.app.use(fileObj.routePath, fileObj.route)
    })
  }
}

module.exports = XrouteBuilder;
module.exports.default = XrouteBuilder;
