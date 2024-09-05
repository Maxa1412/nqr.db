# NQRDB

`NQRDB` is a simple and versatile JSON-based database class for Node.js. It allows for CRUD operations, querying, and various utility functions on a JSON file used as a database. 

## Installation

To use `NQRDB`, you need to have Node.js installed. Install the package using npm:

```bash
npm install nqrdb
```

## Usage

Here's a quick overview of how to use `NQRDB`:

### Initialization

```javascript
import NQRDB from 'nqrdb';

// Create an instance of the database, with an optional file name.
const db = new NQRDB('mydatabase.json');
```

### Basic Operations

- **Set a value:**

  ```javascript
  db.set('key', 'value');
  ```

- **Fetch a value:**

  ```javascript
  const value = db.fetch('key');
  ```

- **Update a value:**

  ```javascript
  db.update('key', 'newValue');
  ```

- **Delete a key:**

  ```javascript
  db.delete('key');
  ```

- **Check if a key exists:**

  ```javascript
  const exists = db.has('key');
  ```

### Advanced Operations

- **Increment a numeric value:**

  ```javascript
  db.add('numericKey', 10);
  ```

- **Decrement a numeric value:**

  ```javascript
  db.subtract('numericKey', 5);
  ```

- **Perform mathematical operations:**

  ```javascript
  db.math('numericKey', '+', 10); // Adds 10
  db.math('numericKey', '-', 5);  // Subtracts 5
  ```

- **Filter entries:**

  ```javascript
  const results = db.filter((key, value) => value > 10);
  ```

- **Map entries:**

  ```javascript
  const mapped = db.map((key, value) => value * 2);
  ```

- **Clone the database:**

  ```javascript
  db.clone('newDatabase');
  ```

- **Merge databases:**

  ```javascript
  db.mergeAll('otherDatabase1.json', 'otherDatabase2.json');
  ```

- **Backup the database:**

  ```javascript
  db.backup('backup');
  ```

### Error Handling

`NQRDB` uses custom error handling with the `NQRError` class and various error codes. Refer to the `ERROR_CODES` enum for details on error types.

## API

### Methods

- `size` - Returns the number of keys in the database.
- `keys()` - Returns an array of all keys.
- `values()` - Returns an array of all values.
- `filter(callback)` - Filters entries based on a callback.
- `map(callback)` - Maps entries based on a callback.
- `find(callback)` - Finds an entry based on a callback.
- `some(callback)` - Checks if any entry matches a callback.
- `every(callback)` - Checks if all entries match a callback.
- `countBy(callback)` - Counts entries matching a callback.
- `updater(key, updater)` - Updates a value using a callback function.
- `update(key, value)` - Updates a value directly.
- `removeByValue(value)` - Removes entries matching a value.
- `clone(newKey, [keyToClone])` - Clones data to a new key.
- `rename(oldKey, newKey)` - Renames a key.
- `toggle(key)` - Toggles a boolean value.
- `mergeAll(...filePaths)` - Merges multiple databases.
- `pluck(key)` - Extracts values by a key.
- `set(key, value)` - Sets a value.
- `fetch(key)` - Fetches a value.
- `has(key)` - Checks if a key exists.
- `delete(key)` - Deletes a key.
- `fetchAll()` - Retrieves all data.
- `backup(fileName)` - Backs up the database.
- `add(key, value)` - Increments a numeric value.
- `subtract(key, value)` - Decrements a numeric value.
- `reset()` - Clears all data.
- `all(limit)` - Retrieves all entries with an optional limit.
- `push(key, value)` - Appends a value to an array.
- `math(key, operation, value)` - Performs a mathematical operation.
- `merge(key, data)` - Merges data with an existing key.
- `clear(key)` - Clears an array or object.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or submit pull requests if you want to contribute to `NQRDB`. # nqr.db
