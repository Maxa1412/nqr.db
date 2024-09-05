"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NQRError = exports.ERROR_CODES = void 0;
/**
 * Enum for error codes used in the nqr.db package.
 * These codes help in identifying and handling specific errors.
 */
var ERROR_CODES;
(function (ERROR_CODES) {
    // File-related errors
    ERROR_CODES[ERROR_CODES["FILE_NOT_FOUND"] = 1000] = "FILE_NOT_FOUND";
    ERROR_CODES[ERROR_CODES["FILE_READ_ERROR"] = 1001] = "FILE_READ_ERROR";
    ERROR_CODES[ERROR_CODES["FILE_WRITE_ERROR"] = 1002] = "FILE_WRITE_ERROR";
    ERROR_CODES[ERROR_CODES["INVALID_FILE_NAME"] = 1003] = "INVALID_FILE_NAME";
    // Data-related errors
    ERROR_CODES[ERROR_CODES["DATA_NOT_DEFINED"] = 2000] = "DATA_NOT_DEFINED";
    ERROR_CODES[ERROR_CODES["DATA_NOT_FOUND"] = 2001] = "DATA_NOT_FOUND";
    ERROR_CODES[ERROR_CODES["INVALID_DATA_TYPE"] = 2002] = "INVALID_DATA_TYPE";
    ERROR_CODES[ERROR_CODES["NO_DATA_TO_ADD"] = 2003] = "NO_DATA_TO_ADD";
    ERROR_CODES[ERROR_CODES["NO_DATA_FOUND"] = 2004] = "NO_DATA_FOUND";
    ERROR_CODES[ERROR_CODES["FILE_NOT_DEFINED"] = 2005] = "FILE_NOT_DEFINED";
    ERROR_CODES[ERROR_CODES["DATA_MUST_BE_OBJECT"] = 2006] = "DATA_MUST_BE_OBJECT";
    // Database operation errors
    ERROR_CODES[ERROR_CODES["DATABASE_OPERATION_FAILED"] = 3000] = "DATABASE_OPERATION_FAILED";
    ERROR_CODES[ERROR_CODES["INVALID_UPDATE_OPERATION"] = 3001] = "INVALID_UPDATE_OPERATION";
    ERROR_CODES[ERROR_CODES["MERGE_FAILED"] = 3002] = "MERGE_FAILED";
    // Key-related errors
    ERROR_CODES[ERROR_CODES["KEY_NOT_DEFINED"] = 4000] = "KEY_NOT_DEFINED";
    ERROR_CODES[ERROR_CODES["KEY_NOT_FOUND"] = 4001] = "KEY_NOT_FOUND";
    ERROR_CODES[ERROR_CODES["KEY_ALREADY_DECLARED"] = 4002] = "KEY_ALREADY_DECLARED";
    // Value-related errors
    ERROR_CODES[ERROR_CODES["VALUE_NOT_ARRAY"] = 5000] = "VALUE_NOT_ARRAY";
    ERROR_CODES[ERROR_CODES["VALUE_NOT_OBJECT"] = 5001] = "VALUE_NOT_OBJECT";
    ERROR_CODES[ERROR_CODES["VALUE_NOT_BOOLEAN"] = 5002] = "VALUE_NOT_BOOLEAN";
    ERROR_CODES[ERROR_CODES["VALUE_NOT_NUMBER"] = 5003] = "VALUE_NOT_NUMBER";
    // Mathematical operation errors
    ERROR_CODES[ERROR_CODES["INVALID_OPERATION"] = 6000] = "INVALID_OPERATION";
    // General errors
    ERROR_CODES[ERROR_CODES["UNKNOWN_ERROR"] = 9000] = "UNKNOWN_ERROR";
})(ERROR_CODES || (exports.ERROR_CODES = ERROR_CODES = {}));
/**
 * Custom error class for the nqr.db package.
 * Provides more specific error handling for database operations.
 */
class NQRError extends Error {
    /**
     * Constructs a new NQRDbError instance.
     * @param {string} message - The error message.
     * @param {ERROR_CODES} code - A custom error code to identify the error type.
     */
    constructor(message, code = 9000) {
        super(message);
        this.name = 'NQRDbError';
        this.code = code;
    }
}
exports.NQRError = NQRError;
