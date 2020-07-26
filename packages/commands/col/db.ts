export let localDB: DB;

export enum PlatFormType {
  /**
   * webpack
   */
  WEBPACK = 1,
  /**
   * vite
   */
  VITE = 2,
}
export enum LibeType {
  /**
   * vue
   */
  VUE = 1,
  /**
   * react
   */
  REACT = 2,
}

export interface DBInstance {
  projectName: string;
  rootPath: string;
  platFormtype: PlatFormType;
  libType: LibeType;
}

class DB {
  private db: DBInstance;
  constructor() {
    this.db = {} as DBInstance;
    localDB = this;
  }
  add<K extends keyof DBInstance, V extends DBInstance[K]>(key: K, value: V) {
    this.db[key] = value;
  }
  get(key: keyof DBInstance) {
    return this.db[key];
  }
  remove(key: keyof DBInstance) {
    delete this.db[key];
  }
  commit() {
    return this.db;
  }
}
export const createDB = () => {
  localDB = new DB();
  return localDB;
};
