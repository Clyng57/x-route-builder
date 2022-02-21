
/**
 * A module that creates a tool for implementing color and formatting for the terminal.
 * @module x-route-builder
 */

/**
 * Class XrouteBuilder - creates a tool for building routes automatically using file-based routing.
 */

declare class XrouteBuilder {

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
  constructor(
    options?: { 
      app: any; 
      dirpath: string | undefined; 
      basepath: string | undefined; 
      ignore: string | undefined;
      change: {
        file: string | undefined,
        new: string | undefined,
      }
    }
  )
  /** @private */
  private error: ()=> void;
  /** @private */
  private dircount: number;
  /** @private */
  private app: any;
  /** @private */
  private dirpath: string;
  /** @private */
  private basepath: string;
  /** @private */
  private fileRoutes: Array<string>;
  /** @private */
  private ignore: Array<string>;
  /** @private */
  private change: {
    file: Array<string>,
    new: Array<string>,
  }
  /** @private */
  private removeJs: (f: string) => string;
  /** @private */
  private returnPath: (f: string, change: Array<string>) => string;
  /** @private */
  private parseBasepath: (pathTo: string) => string;
  /** @private */
  private buildRoutes: (options: {
    dircount: number,
    dirpath: string,
    basepath: string,
    fileRoutes: Array<string>,
    ignore: Array<string>,
    change: {
      file: Array<string>,
      new: Array<string>,
    },
  }) => Array<string>;
  /** 
   * Execute and create file-based routes
   */
  create(): void
}

export = XrouteBuilder;
