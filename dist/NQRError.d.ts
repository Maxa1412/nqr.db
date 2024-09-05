/**
 * Enum for error codes used in the nqr.db package.
 * These codes help in identifying and handling specific errors.
 */
export declare enum ERROR_CODES {
    FILE_NOT_FOUND = 1000,
    FILE_READ_ERROR = 1001,
    FILE_WRITE_ERROR = 1002,
    INVALID_FILE_NAME = 1003,
    DATA_NOT_DEFINED = 2000,
    DATA_NOT_FOUND = 2001,
    INVALID_DATA_TYPE = 2002,
    NO_DATA_TO_ADD = 2003,
    NO_DATA_FOUND = 2004,
    FILE_NOT_DEFINED = 2005,
    DATA_MUST_BE_OBJECT = 2006,
    DATABASE_OPERATION_FAILED = 3000,
    INVALID_UPDATE_OPERATION = 3001,
    MERGE_FAILED = 3002,
    KEY_NOT_DEFINED = 4000,
    KEY_NOT_FOUND = 4001,
    KEY_ALREADY_DECLARED = 4002,
    VALUE_NOT_ARRAY = 5000,
    VALUE_NOT_OBJECT = 5001,
    VALUE_NOT_BOOLEAN = 5002,
    VALUE_NOT_NUMBER = 5003,
    INVALID_OPERATION = 6000,
    UNKNOWN_ERROR = 9000
}
/**
 * Custom error class for the nqr.db package.
 * Provides more specific error handling for database operations.
 */
export declare class NQRError extends Error {
    /**
     * The error code associated with this error.
     * @type {ERROR_CODES}
     */
    code: ERROR_CODES;
    /**
     * Constructs a new NQRDbError instance.
     * @param {string} message - The error message.
     * @param {ERROR_CODES} code - A custom error code to identify the error type.
     */
    constructor(message: string, code?: ERROR_CODES);
}
