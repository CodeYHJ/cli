export let localDB: DB | null = null;

// type CreateProject = {
//   name: string;
// };
type DBInstance = {
  [key: string]: string | Object | Array<string | Object> | null;
};

class DB {
  private db: DBInstance;
  constructor() {
    this.db = {};
  }
  add(key: string, value: string) {
    this.db[key] = value;
  }
  get(key: string) {
    return this.db[key];
  }
  remove(key: string) {
    delete this.db[key];
  }
  commit() {
    return this.db;
  }
}
export const createDB = () => {
  if (localDB != null) localDB = null;
  localDB = new DB();
};
