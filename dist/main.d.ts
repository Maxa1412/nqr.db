import { NQRError, ERROR_CODES } from './NQRError';
declare class NQRDB {
    private readonly dbPath;
    /**
     * @param {string} dbname - Must ends with '.json'
     */
    constructor(dbname?: string);
    private _resolve;
    /**
     * Initializes the database file if it doesn't exist.
     */
    private _initDB;
    /**
     * Reads and parses the database file.
     */
    private _readDB;
    /**
     * Writes data to the database file.
     */
    private _writeDB;
    /**
     * Returns the number of keys in the database.
     * @returns {number} The number of keys in the database.
     */
    get size(): number;
    /**
     * Returns an array of all keys in the database.
     * @returns {string[]} An array containing all keys in the database.
     */
    keys(): string[];
    /**
     * Returns an array of all values in the database.
     * @returns {any[]} An array containing all values in the database.
     */
    values(): any[];
    /**
     * Filters database entries based on a provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to filter entries.
     * @returns {Array<[string, T]>} An array of key-value pairs that match the filter criteria.
     * @template T
     */
    filter<T>(callback: (key: string, value: T) => boolean): Array<[string, T]>;
    /**
     * Maps the database entries to a new array based on a provided callback function.
     * @param {(key: string, value: T) => U} callback - The callback function to map entries.
     * @returns {U[]} An array containing the results of applying the callback function to each entry.
     * @template T, U
     */
    map<T, U>(callback: (key: string, value: T) => U): U[];
    /**
     * Finds a database entry that matches a provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to find an entry.
     * @returns {[string, T] | undefined} The first key-value pair that matches the callback criteria, or undefined if not found.
     * @template T
     */
    find<T>(callback: (key: string, value: T) => boolean): [string, T] | undefined;
    /**
     * Checks if at least one entry in the database matches the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to test entries.
     * @returns {boolean} True if at least one entry matches the callback criteria, false otherwise.
     * @template T
     */
    some<T>(callback: (key: string, value: T) => boolean): boolean;
    /**
     * Checks if every entry in the database matches the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to test entries.
     * @returns {boolean} True if all entries match the callback criteria, false otherwise.
     * @template T
     */
    every<T>(callback: (key: string, value: T) => boolean): boolean;
    /**
     * Counts the number of entries that satisfy the provided callback function.
     * @param {(key: string, value: T) => boolean} callback - The callback function to count entries.
     * @returns {number} The number of entries that match the callback criteria.
     * @template T
     */
    countBy<T>(callback: (key: string, value: T) => boolean): number;
    /**
     * Updates a value in the database using a callback function to modify it.
     * @param {string} key - The key of the entry to update.
     * @param {(value: T) => T} updater - The callback function to modify the value.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     * @template T
     */
    updater<T>(key: string, updater: (value: T) => T): void;
    /**
     * Updates a value in the database
     * @param {string} key - The key of the entry to update.
     * @param {any} value - The value you want to update.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     * @template T
     */
    update<T>(key: string, value: string): void;
    /**
     * Removes all entries from the database that match a specific value.
     * @param {T} value - The value to remove from the database.
     * @template T
     */
    removeByValue<T>(value: T): void;
    /**
     * Clones the entire database or a specific key to a new location.
     * @param {string} newKey - The key under which the cloned data will be stored.
     * @param {string} [keyToClone] - The specific key to clone. If not provided, the entire database will be cloned.
     * @throws {NQRError} If the key to clone does not exist in the database.
     * @template T
     */
    clone<T>(newKey: string, keyToClone?: string): void;
    /**
     * Renames a key in the database.
     * @param {string} oldKey - The existing key to rename.
     * @param {string} newKey - The new key name.
     * @throws {NQRError} If the old key does not exist in the database.
     */
    rename(oldKey: string, newKey: string): void;
    /**
     * Toggles a boolean value in the database.
     * @param {string} key - The key of the boolean value to toggle.
     * @throws {NQRError} If the key does not exist or the value is not a boolean.
     */
    toggle(key: string): void;
    /**
     * Merges multiple database files into the current one.
     * @param {...string} filePaths - The file paths of the databases to merge.
     */
    mergeAll(...filePaths: string[]): void;
    /**
     * Extracts specific values from all entries by a given key.
     * @param {string} key - The key to pluck values by.
     * @returns {T[]} An array of values corresponding to the specified key.
     * @template T
     */
    pluck<T>(key: string): T[];
    /**
     * Sets a value in the database.
     * @param {string} key - The key of the entry to set.
     * @param {any} value - The value to set.
     */
    set(key: string, value: any): void;
    /**
     * Fetches a value from the database by key.
     * @param {string} key - The key of the entry to fetch.
     * @returns {any} The value associated with the key.
     */
    fetch(key: string): any;
    /**
     * Checks if a key exists in the database.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key: string): boolean;
    /**
     * Deletes a key from the database.
     * @param {string} key - The key of the entry to delete.
     * @throws {NQRError} If the key is not defined or does not exist in the database.
     */
    delete(key: string): void;
    /**
     * Retrieves all data from the database.
     * @returns {Record<string, any>} The entire database content.
     */
    fetchAll(): Record<string, any>;
    /**
     * Backs up the database to a specified file.
     * @param {string} fileName - The name of the backup file. Must ends with '.json'
     * @throws {NQRError} If the filename is not defined.
     */
    backup(fileName: string): void;
    /**
     * Increments a numeric value in the database.
     * @param {string} key - The key of the numeric value to increment.
     * @param {number} value - The amount to increment by.
     * @throws {NQRError} If the key is not defined or the value is not a number.
     */
    add(key: string, value: number): void;
    /**
     * Decrements a numeric value in the database.
     * @param {string} key - The key of the numeric value to decrement.
     * @param {number} value - The amount to decrement by.
     * @throws {NQRError} If the key is not defined, the value is not a number, or the key does not exist in the database.
     */
    subtract(key: string, value: number): void;
    /**
     * Resets the database by clearing all data.
     */
    reset(): void;
    /**
     * Retrieves all keys and values in the database, with an optional limit.
     * @param {number} [limit=0] - The maximum number of entries to retrieve. If 0, retrieves all entries.
     * @returns {Array<[string, any]>} An array of key-value pairs.
     */
    all(limit?: number): Array<[string, any]>;
    /**
     * Appends a value to an array in the database.
     * @param {string} key - The key of the array to append to.
     * @param {any} value - The value to append.
     * @throws {NQRError} If the key is not defined or the value is not an array.
     */
    push(key: string, value: any): void;
    /**
     * Performs a mathematical operation on a numeric value in the database.
     * @param {string} key - The key of the numeric value to operate on.
     * @param {'+' | '-' | '*' | '/' | '%'} operation - The mathematical operation to perform.
     * @param {number} value - The value to use in the operation.
     * @throws {NQRError} If the key is not defined, the operation is invalid, or the value is not a number.
     */
    math(key: string, operation: '+' | '-' | '*' | '/' | '%', value: number): void;
    /**
     * Merges an object with the existing database data.
     * @param {string} key - The key to merge data with.
     * @param {Record<string, any>} data - The data to merge.
     * @throws {NQRError} If the key is not defined or the data is not an object.
     */
    merge(key: string, data: Record<string, any>): void;
    /**
     * Clears an array or object in the database.
     * @param {string} key - The key of the array or object to clear.
     * @throws {NQRError} If the key is not defined or the data is not an array or object.
     */
    clear(key: string): void;
}
export { NQRDB, NQRError, ERROR_CODES };
