"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODES = exports.NQRError = exports.NQRDB = void 0;
const fs = __importStar(require("fs"));
const NQRError_1 = require("./NQRError");
Object.defineProperty(exports, "NQRError", { enumerable: true, get: function () { return NQRError_1.NQRError; } });
Object.defineProperty(exports, "ERROR_CODES", { enumerable: true, get: function () { return NQRError_1.ERROR_CODES; } });
class NQRDB {
    /**
     * @param {string} dbname - Must ends with '.json'
     */
    constructor(dbname = 'nqrdb.json') {
        this.dbPath = this._resolve(dbname).path;
        this._initDB();
    }
    _resolve(file) {
        if (typeof file !== 'string')
            throw new NQRError_1.NQRError("The name of the file must be type of 'string'", NQRError_1.ERROR_CODES.INVALID_FILE_NAME);
        file = file.endsWith('.json') ? file : file + '.json';
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
        if (jsonFiles.includes(file))
            throw new NQRError_1.NQRError("Invalid name was provided", NQRError_1.ERROR_CODES.INVALID_FILE_NAME);
        let res = { path: `${process.cwd()}/${file}`, exist: false };
        if (fs.existsSync(res.path))
            res.exist = true;
        else
            res.exist = false;
        return res;
    }
    /**
     * Initializes the database file if it doesn't exist.
     */
    _initDB() {
        if (!fs.existsSync(this.dbPath)) {
            fs.writeFileSync(this.dbPath, '{}');
        }
    }
    /**
     * Reads and parses the database file.
     */
    _readDB() {
        return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    }
    /**
     * Writes data to the database file.
     */
    _writeDB(data) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }
    /**
     * Returns the number of keys in the database.
     * @returns {number} The number of keys in the database.
     */
    get size() {
        const db = this._readDB();
        return Object.keys(db).length;
    }
    /**
     * Returns an array of all keys in the database.
     * @returns {string[]} An array containing all keys in the database.
     */
    keys() {
        const db = this._readDB();
        return Object.keys(db);
    }
    /**
     * Returns an array of all values in the database.
     * @returns {any[]} An array containing all values in the database.
     */
    values() {
        const db = this._readDB();
        return Object.values(db);
    }
    /**
     * Filters database entries based on a provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to filter entries.
     * @returns {Array<[string, T]>} An array of key-value pairs that match the filter criteria.
     * @template T
     */
    filter(callback) {
        if (typeof callback !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).filter(([key, value]) => callback(key, value));
    }
    /**
     * Maps the database entries to a new array based on a provided callback function.
     * @param {(key: string, value: T) => U} callback - The callback function to map entries.
     * @returns {U[]} An array containing the results of applying the callback function to each entry.
     * @template T, U
     */
    map(callback) {
        if (typeof callback !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).map(([key, value]) => callback(key, value));
    }
    /**
     * Finds a database entry that matches a provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to find an entry.
     * @returns {[string, T] | undefined} The first key-value pair that matches the callback criteria, or undefined if not found.
     * @template T
     */
    find(callback) {
        if (typeof callback !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).find(([key, value]) => callback(key, value));
    }
    /**
     * Checks if at least one entry in the database matches the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to test entries.
     * @returns {boolean} True if at least one entry matches the callback criteria, false otherwise.
     * @template T
     */
    some(callback) {
        if (typeof callback !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).some(([key, value]) => callback(key, value));
    }
    /**
     * Checks if every entry in the database matches the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to test entries.
     * @returns {boolean} True if all entries match the callback criteria, false otherwise.
     * @template T
     */
    every(callback) {
        if (typeof callback !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).every(([key, value]) => callback(key, value));
    }
    /**
     * Counts the number of entries that satisfy the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to count entries.
     * @returns {number} The number of entries that match the callback criteria.
     * @template T
     */
    countBy(callback) {
        if (typeof callback !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof callback}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        return Object.entries(db).filter(([key, value]) => callback(key, value)).length;
    }
    /**
     * Updates a value in the database using a callback function to modify it.
     * @param {string} key - The key of the entry to update.
     * @param {(value: T) => T} updater - The callback function to modify the value.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     * @template T
     */
    updater(key, updater) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        if (typeof updater !== 'function')
            throw new NQRError_1.NQRError(`Cannot convert type 'function' to type '${typeof updater}'`, NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        const db = this._readDB();
        if (!this.has(key))
            throw new NQRError_1.NQRError(`No data found for key: ${key}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
        db[key] = updater(db[key]);
        this._writeDB(db);
    }
    /**
     * Updates a value in the database
     * @param {string} key - The key of the entry to update.
     * @param {any} value - The value you want to update.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     * @template T
     */
    update(key, value) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (!this.has(key))
            throw new NQRError_1.NQRError(`No data found for key: ${key}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
        db[key] = value;
        this._writeDB(db);
    }
    /**
     * Removes all entries from the database that match a specific value.
     * @param {T} value - The value to remove from the database.
     * @template T
     */
    removeByValue(value) {
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
    clone(newKey, keyToClone) {
        const db = this._readDB();
        if (keyToClone) {
            if (!this.has(keyToClone))
                throw new NQRError_1.NQRError(`No data found for key: ${keyToClone}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
            db[newKey] = db[keyToClone];
        }
        else {
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
    rename(oldKey, newKey) {
        if (!this.has(oldKey))
            throw new NQRError_1.NQRError(`No data found for key: ${oldKey}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
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
    toggle(key) {
        if (!this.has(key))
            throw new NQRError_1.NQRError(`No data found for key: ${key}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
        const db = this._readDB();
        if (typeof db[key] !== 'boolean')
            throw new NQRError_1.NQRError('The value must be a boolean!', NQRError_1.ERROR_CODES.VALUE_NOT_BOOLEAN);
        db[key] = !db[key];
        this._writeDB(db);
    }
    /**
     * Merges multiple database files into the current one.
     * @param {...string} filePaths - The file paths of the databases to merge.
     */
    mergeAll(...filePaths) {
        const currentDB = this._readDB();
        for (const filePath of filePaths) {
            if (!fs.existsSync(filePath))
                continue;
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
    pluck(key) {
        const db = this._readDB();
        return Object.values(db).map(value => value[key]);
    }
    /**
     * Sets a value in the database.
     * @param {string} key - The key of the entry to set.
     * @param {any} value - The value to set.
     */
    set(key, value) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (db[key])
            throw new NQRError_1.NQRError('The key already declared!', NQRError_1.ERROR_CODES.KEY_ALREADY_DECLARED);
        db[key] = value;
        this._writeDB(db);
    }
    /**
     * Fetches a value from the database by key.
     * @param {string} key - The key of the entry to fetch.
     * @returns {any} The value associated with the key.
     */
    fetch(key) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        return db[key];
    }
    /**
     * Checks if a key exists in the database.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        return db.hasOwnProperty(key);
    }
    /**
     * Deletes a key from the database.
     * @param {string} key - The key of the entry to delete.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     */
    delete(key) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (!(key in db))
            throw new NQRError_1.NQRError(`No data found for key: ${key}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
        delete db[key];
        this._writeDB(db);
    }
    /**
     * Retrieves all data from the database.
     * @returns {Record<string, any>} The entire database content.
     */
    fetchAll() {
        return this._readDB();
    }
    /**
     * Backs up the database to a specified file.
     * @param {string} fileName - The name of the backup file. Must ends with '.json'
     * @throws {NQRError} If the filename is not defined.
     */
    backup(fileName) {
        if (!fileName)
            throw new NQRError_1.NQRError('Filename not defined!', NQRError_1.ERROR_CODES.FILE_NOT_DEFINED);
        const db = this._readDB();
        fs.writeFileSync(this._resolve(fileName).path, JSON.stringify(db, null, 2));
    }
    /**
     * Increments a numeric value in the database.
     * @param {string} key - The key of the numeric value to increment.
     * @param {number} value - The amount to increment by.
     * @throws {NQRError} If the key is not defined or the value is not a number.
     */
    add(key, value) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        if (isNaN(value))
            throw new NQRError_1.NQRError('The value must be a number!', NQRError_1.ERROR_CODES.VALUE_NOT_NUMBER);
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
    subtract(key, value) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        if (isNaN(value))
            throw new NQRError_1.NQRError('The value must be a number!', NQRError_1.ERROR_CODES.VALUE_NOT_NUMBER);
        const db = this._readDB();
        if (!this.has(key))
            throw new NQRError_1.NQRError(`No data found for key: ${key}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
        db[key] -= value;
        this._writeDB(db);
    }
    /**
     * Resets the database by clearing all data.
     */
    reset() {
        this._writeDB({});
    }
    /**
     * Retrieves all keys and values in the database, with an optional limit.
     * @param {number} [limit=0] - The maximum number of entries to retrieve. If 0, retrieves all entries.
     * @returns {Array<[string, any]>} An array of key-value pairs.
     */
    all(limit = 0) {
        const db = this._readDB();
        const entries = Object.entries(db);
        return limit > 0 ? entries.slice(0, limit) : entries;
    }
    /**
     * Appends a value to an array in the database.
     * @param {string} key - The key of the array to append to.
     * @param {any} value - The value to append.
     * @throws {NQRError} If the key is not defined or the value is not an array.
     */
    push(key, value) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
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
    math(key, operation, value) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        if (!operation)
            throw new NQRError_1.NQRError('The operation is not defined!', NQRError_1.ERROR_CODES.INVALID_OPERATION);
        if (isNaN(value))
            throw new NQRError_1.NQRError('The value must be a number!', NQRError_1.ERROR_CODES.VALUE_NOT_NUMBER);
        const db = this._readDB();
        if (!this.has(key))
            throw new NQRError_1.NQRError(`No data found for key: ${key}`, NQRError_1.ERROR_CODES.DATA_NOT_FOUND);
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
                if (value === 0)
                    db[key] = Infinity;
                else if (value === -0)
                    db[key] = -Infinity;
                else
                    db[key] /= value;
                break;
            case '%':
                db[key] %= value;
                break;
            default:
                throw new NQRError_1.NQRError('Invalid operation!', NQRError_1.ERROR_CODES.INVALID_OPERATION);
        }
        this._writeDB(db);
    }
    /**
     * Merges an object with the existing database data.
     * @param {string} key - The key to merge data with.
     * @param {Record<string, any>} data - The data to merge.
     * @throws {NQRError} If the key is not defined or the data is not an object.
     */
    merge(key, data) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        if (typeof data !== 'object' || Array.isArray(data)) {
            throw new NQRError_1.NQRError('The data must be an object!', NQRError_1.ERROR_CODES.DATA_MUST_BE_OBJECT);
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
    clear(key) {
        if (!key)
            throw new NQRError_1.NQRError('The key is not defined!', NQRError_1.ERROR_CODES.KEY_NOT_DEFINED);
        const db = this._readDB();
        if (Array.isArray(db[key])) {
            db[key] = [];
        }
        else if (typeof db[key] === 'object' && db[key] !== null) {
            db[key] = {};
        }
        else {
            throw new NQRError_1.NQRError('The data must be an array or an object!', NQRError_1.ERROR_CODES.INVALID_DATA_TYPE);
        }
        this._writeDB(db);
    }
}
exports.NQRDB = NQRDB;
