import * as config from 'config.js'
export class Environment {
  static get configuration(): any {
    return config;
  }
}