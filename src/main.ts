import * as fs from 'fs';
import { NQRError, ERROR_CODES } from './NQRError';

class NQRDB {
    private readonly dbPath: string;
    /**
     * @param {string} dbname - Must ends with '.json'
     */
    constructor(dbname: string = 'nqrdb.json') {
        this.dbPath = this._resolve(dbname).path;
        this._initDB();
    }

    private _resolve(file: string): { path: string, exist: boolean } {
      if (typeof file !== 'string') throw new NQRError("The name of the file must be type of 'string'", ERROR_CODES.INVALID_FILE_NAME);
      file = file.endsWith('.json')? file : file + '.json';
      const jsonFiles = [
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "eslint.json",
        ".eslintrc.json",
        "babel.config.json",
        "webpack.config.json",
        "nodemon.json",
        "prettierrc.json",
        "jest.config.json",
        "tslint.json",
        "composer.json"
      ];

      if (jsonFiles.includes(file)) throw new NQRError("Invalid name was provided", ERROR_CODES.INVALID_FILE_NAME);
      let res = { path: `${process.cwd()}/${file}`, exist: false };
      if (fs.existsSync(res.path)) res.exist = true;
      else res.exist = false;
      return res;
    }

    /**
     * Initializes the database file if it doesn't exist.
     */
    private _initDB(): void {
        if (!fs.existsSync(this.dbPath)) {
            fs.writeFileSync(this.dbPath, '{}');
        }
    }

    /**
     * Reads and parses the database file.
     */
    private _readDB(): Record<string, any> {
        return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    }

    /**
     * Writes data to the database file.
     */
    private _writeDB(data: Record<string, any>): void {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }

    /**
     * Returns the number of keys in the database.
     * @returns {number} The number of keys in the database.
     */
    get size(): number {
        const db = this._readDB();
        return Object.keys(db).length;
    }

    /**
     * Returns an array of all keys in the database.
     * @returns {string[]} An array containing all keys in the database.
     */
    keys(): string[] {
        const db = this._readDB();
        return Object.keys(db);
    }

    /**
     * Returns an array of all values in the database.
     * @returns {any[]} An array containing all values in the database.
     */
    values(): any[] {
        const db = this._readDB();
        return Object.values(db);
    }

    /**
     * Filters database entries based on a provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to filter entries.
     * @returns {Array<[string, T]>} An array of key-value pairs that match the filter criteria.
     * @template T
     */
    filter<T>(callback: (key: string, value: T) => boolean): Array<[string, T]> {
        if (typeof callback !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).filter(([key, value]) => callback(key, value as T)) as Array<[string, T]>;
    }

    /**
     * Maps the database entries to a new array based on a provided callback function.
     * @param {(key: string, value: T) => U} callback - The callback function to map entries.
     * @returns {U[]} An array containing the results of applying the callback function to each entry.
     * @template T, U
     */
    map<T, U>(callback: (key: string, value: T) => U): U[] {
        if (typeof callback !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).map(([key, value]) => callback(key, value as T));
    }

    /**
     * Finds a database entry that matches a provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to find an entry.
     * @returns {[string, T] | undefined} The first key-value pair that matches the callback criteria, or undefined if not found.
     * @template T
     */
    find<T>(callback: (key: string, value: T) => boolean): [string, T] | undefined {
        if (typeof callback !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).find(([key, value]) => callback(key, value as T)) as [string, T] | undefined;
    }

    /**
     * Checks if at least one entry in the database matches the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to test entries.
     * @returns {boolean} True if at least one entry matches the callback criteria, false otherwise.
     * @template T
     */
    some<T>(callback: (key: string, value: T) => boolean): boolean {
        if (typeof callback !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).some(([key, value]) => callback(key, value as T));
    }

    /**
     * Checks if every entry in the database matches the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to test entries.
     * @returns {boolean} True if all entries match the callback criteria, false otherwise.
     * @template T
     */
    every<T>(callback: (key: string, value: T) => boolean): boolean {
        if (typeof callback !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).every(([key, value]) => callback(key, value as T));
    }

    /**
     * Counts the number of entries that satisfy the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to count entries.
     * @returns {number} The number of entries that match the callback criteria.
     * @template T
     */
    countBy<T>(callback: (key: string, value: T) => boolean): number {
        if (typeof callback !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).filter(([key, value]) => callback(key, value as T)).length;
    }

    /**
     * Updates a value in the database using a callback function to modify it.
     * @param {string} key - The key of the entry to update.
     * @param {(value: T) => T} updater - The callback function to modify the value.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     * @template T
     */
    updater<T>(key: string, updater: (value: T) => T): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        if (typeof updater !== 'function') throw new NQRError(`Cannot convert type 'function' to type '${typeof updater}'`, ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        if (!this.has(key)) throw new NQRError(`No data found for key: ${key}`, ERROR_CODES.DATA_NOT_FOUND);
        db[key] = updater(db[key] as T);
        this._writeDB(db);
    }

    /**
     * Updates a value in the database 
     * @param {string} key - The key of the entry to update.
     * @param {any} value - The value you want to update.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     * @template T
     */
    update<T>(key: string, value: string): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (!this.has(key)) throw new NQRError(`No data found for key: ${key}`, ERROR_CODES.DATA_NOT_FOUND);
        db[key] = value;
        this._writeDB(db);
    }

    /**
     * Removes all entries from the database that match a specific value.
     * @param {T} value - The value to remove from the database.
     * @template T
     */
    removeByValue<T>(value: T): void {
        const db = this._readDB();
        for (const key in db) {
            if (db[key] === value) {
                delete db[key];
            }
        }
        this._writeDB(db);
    }

    /**
     * Clones the entire database or a specific key to a new location.
     * @param {string} newKey - The key under which the cloned data will be stored.
     * @param {string} [keyToClone] - The specific key to clone. If not provided, the entire database will be cloned.
     * @throws {NQRError} If the key to clone does not exist in the database.
     * @template T
     */
    clone<T>(newKey: string, keyToClone?: string): void {
        const db = this._readDB();
        if (keyToClone) {
            if (!this.has(keyToClone)) throw new NQRError(`No data found for key: ${keyToClone}`, ERROR_CODES.DATA_NOT_FOUND);
            db[newKey] = db[keyToClone];
        } else {
            db[newKey] = { ...db };
        }
        this._writeDB(db);
    }

    /**
     * Renames a key in the database.
     * @param {string} oldKey - The existing key to rename.
     * @param {string} newKey - The new key name.
     * @throws {NQRError} If the old key does not exist in the database.
     */
    rename(oldKey: string, newKey: string): void {
        if (!this.has(oldKey)) throw new NQRError(`No data found for key: ${oldKey}`, ERROR_CODES.DATA_NOT_FOUND);
        const db = this._readDB();
        db[newKey] = db[oldKey];
        delete db[oldKey];
        this._writeDB(db);
    }

    /**
     * Toggles a boolean value in the database.
     * @param {string} key - The key of the boolean value to toggle.
     * @throws {NQRError} If the key does not exist or the value is not a boolean.
     */
    toggle(key: string): void {
        if (!this.has(key)) throw new NQRError(`No data found for key: ${key}`, ERROR_CODES.DATA_NOT_FOUND);
        const db = this._readDB();
        if (typeof db[key] !== 'boolean') throw new NQRError('The value must be a boolean!', ERROR_CODES.VALUE_NOT_BOOLEAN);
        db[key] = !db[key];
        this._writeDB(db);
    }

    /**
     * Merges multiple database files into the current one.
     * @param {...string} filePaths - The file paths of the databases to merge.
     */
    mergeAll(...filePaths: string[]): void {
        const currentDB = this._readDB();
        for (const filePath of filePaths) {
            if (!fs.existsSync(filePath)) continue;
            const dbToMerge = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            Object.assign(currentDB, dbToMerge);
        }
        this._writeDB(currentDB);
    }

    /**
     * Extracts specific values from all entries by a given key.
     * @param {string} key - The key to pluck values by.
     * @returns {T[]} An array of values corresponding to the specified key.
     * @template T
     */
    pluck<T>(key: string): T[] {
        const db = this._readDB();
        return Object.values(db).map(value => value[key]);
    }

    /**
     * Sets a value in the database.
     * @param {string} key - The key of the entry to set.
     * @param {any} value - The value to set.
     */
    set(key: string, value: any): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (db[key]) throw new NQRError('The key already declared!', ERROR_CODES.KEY_ALREADY_DECLARED);
        db[key] = value;
        this._writeDB(db);
    }

    /**
     * Fetches a value from the database by key.
     * @param {string} key - The key of the entry to fetch.
     * @returns {any} The value associated with the key.
     */
    fetch(key: string): any {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        return db[key];
    }

    /**
     * Checks if a key exists in the database.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key: string): boolean {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        return db.hasOwnProperty(key);
    }

    /**
     * Deletes a key from the database.
     * @param {string} key - The key of the entry to delete.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     */
    delete(key: string): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (!(key in db)) throw new NQRError(`No data found for key: ${key}`, ERROR_CODES.DATA_NOT_FOUND);
        delete db[key];
        this._writeDB(db);
    }

    /**
     * Retrieves all data from the database.
     * @returns {Record<string, any>} The entire database content.
     */
    fetchAll(): Record<string, any> {
        return this._readDB();
    }

    /**
     * Backs up the database to a specified file.
     * @param {string} fileName - The name of the backup file. Must ends with '.json'
     * @throws {NQRError} If the filename is not defined.
     */
    backup(fileName: string): void {
        if (!fileName) throw new NQRError('Filename not defined!', ERROR_CODES.FILE_NOT_DEFINED);
        const db = this._readDB();
        fs.writeFileSync(this._resolve(fileName).path, JSON.stringify(db, null, 2));
    }

    /**
     * Increments a numeric value in the database.
     * @param {string} key - The key of the numeric value to increment.
     * @param {number} value - The amount to increment by.
     * @throws {NQRError} If the key is not defined or the value is not a number.
     */
    add(key: string, value: number): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        if (isNaN(value)) throw new NQRError('The value must be a number!', ERROR_CODES.VALUE_NOT_NUMBER);
        const db = this._readDB();
        if (!this.has(key)) {
            db[key] = 0;
        }
        db[key] += value;
        this._writeDB(db);
    }

    /**
     * Decrements a numeric value in the database.
     * @param {string} key - The key of the numeric value to decrement.
     * @param {number} value - The amount to decrement by.
     * @throws {NQRError} If the key is not defined, the value is not a number, or the key does not exist in the database.
     */
    subtract(key: string, value: number): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        if (isNaN(value)) throw new NQRError('The value must be a number!', ERROR_CODES.VALUE_NOT_NUMBER);
        const db = this._readDB();
        if (!this.has(key)) throw new NQRError(`No data found for key: ${key}`, ERROR_CODES.DATA_NOT_FOUND);
        db[key] -= value;
        this._writeDB(db);
    }

    /**
     * Resets the database by clearing all data.
     */
    reset(): void {
        this._writeDB({});
    }

    /**
     * Retrieves all keys and values in the database, with an optional limit.
     * @param {number} [limit=0] - The maximum number of entries to retrieve. If 0, retrieves all entries.
     * @returns {Array<[string, any]>} An array of key-value pairs.
     */
    all(limit: number = 0): Array<[string, any]> {
        const db = this._readDB();
        const entries = Object.entries(db);
        return limit > 0? entries.slice(0, limit) : entries;
    }

    /**
     * Appends a value to an array in the database.
     * @param {string} key - The key of the array to append to.
     * @param {any} value - The value to append.
     * @throws {NQRError} If the key is not defined or the value is not an array.
     */
    push(key: string, value: any): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (!Array.isArray(db[key])) {
            db[key] = [];
        }
        db[key].push(value);
        this._writeDB(db);
    }

    /**
     * Performs a mathematical operation on a numeric value in the database.
     * @param {string} key - The key of the numeric value to operate on.
     * @param {'+' | '-' | '*' | '/' | '%'} operation - The mathematical operation to perform.
     * @param {number} value - The value to use in the operation.
     * @throws {NQRError} If the key is not defined, the operation is invalid, or the value is not a number.
     */
    math(key: string, operation: '+' | '-' | '*' | '/' | '%', value: number): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        if (!operation) throw new NQRError('The operation is not defined!', ERROR_CODES.INVALID_OPERATION);
        if (isNaN(value)) throw new NQRError('The value must be a number!', ERROR_CODES.VALUE_NOT_NUMBER);

        const db = this._readDB();
        if (!this.has(key)) throw new NQRError(`No data found for key: ${key}`, ERROR_CODES.DATA_NOT_FOUND);

        switch (operation) {
            case '+':
                db[key] += value;
                break;
            case '-':
                db[key] -= value;
                break;
            case '*':
                db[key] *= value;
                break;
            case '/':
                if (value === 0) db[key] = Infinity;
                else if (value === -0) db[key] = -Infinity;
                else db[key] /= value;
                break;
            case '%':
                db[key] %= value;
                break;
            default:
                throw new NQRError('Invalid operation!', ERROR_CODES.INVALID_OPERATION);
        }
        this._writeDB(db);
    }

    /**
     * Merges an object with the existing database data.
     * @param {string} key - The key to merge data with.
     * @param {Record<string, any>} data - The data to merge.
     * @throws {NQRError} If the key is not defined or the data is not an object.
     */
    merge(key: string, data: Record<string, any>): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        if (typeof data !== 'object' || Array.isArray(data)) {
            throw new NQRError('The data must be an object!', ERROR_CODES.DATA_MUST_BE_OBJECT);
        }

        const db = this._readDB();
        if (!this.has(key)) {
            db[key] = {};
        }
        db[key] = { ...db[key], ...data };
        this._writeDB(db);
    }

    /**
     * Clears an array or object in the database.
     * @param {string} key - The key of the array or object to clear.
     * @throws {NQRError} If the key is not defined or the data is not an array or object.
     */
    clear(key: string): void {
        if (!key) throw new NQRError('The key is not defined!', ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (Array.isArray(db[key])) {
            db[key] = [];
        } else if (typeof db[key] === 'object' && db[key] !== null) {
            db[key] = {};
        } else {
            throw new NQRError('The data must be an array or an object!', ERROR_CODES.INVALID_DATA_TYPE);
        }
        this._writeDB(db);
    }
}

export { NQRDB, NQRError, ERROR_CODES };