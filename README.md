# Visitor Counter API Documentation

## Introduction
This API provides a simple counter service. It reads, increments, and resets a counter stored in a file (`count.txt`). The counter can be accessed and manipulated via HTTP GET requests. This documentation covers all the endpoints and functionalities of the API.

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Get and Increment Counter
```
GET /
```
#### Description:
Retrieves the current counter value, increments it by one, and then returns the new counter value. If the query parameter `q` is not provided or is empty, this endpoint will read the current count from the file, increment it, and update the file.

#### Parameters:
- `q`: Optional query parameter.
  - If not provided or empty, the counter is incremented.
  - If set to `'reset'`, the counter is reset to 0 and returned.

#### Responses:
- **200 OK**: Returns the current counter value after incrementing or resetting.
  - Example response: `{ "value": 5 }`
- **400 Bad Request**: If the value in the file is not a valid number.
  - Example response: `Invalid count value in file`
- **500 Internal Server Error**: If there is an error reading or writing the file.
  - Example response: `Error reading file` or `Error writing file`

### Example Usage:
#### Increment Counter
```
GET http://localhost:3000/
```
#### Reset Counter
```
GET http://localhost:3000/?q=reset
```
#### Get Counter without Incrementing
```
GET http://localhost:3000/?q=any_other_value
```

## Setup Instructions

### Prerequisites
- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository:
   ```sh
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```sh
   cd <project_directory>
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `count.txt` file in the root directory of the project and initialize it with a number, e.g., `0`.

### Running the Server
To start the server, run:
```sh
npm start
```
The server will start on the port specified in the `PORT` environment variable or default to `3000`.

## Code Overview

### Dependencies
- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `body-parser`: Node.js body parsing middleware
- `cors`: Middleware to enable Cross-Origin Resource Sharing
- `fs`: File system module for reading and writing files

### Middleware
- `bodyParser.json()`: Parses incoming requests with JSON payloads.
- `cors()`: Enables CORS for all routes.

### File Handling
- On server startup, the `count.txt` file is read to initialize the in-memory counter.
- The `fs.watch` method is used to monitor changes to the `count.txt` file and update the in-memory counter accordingly.
- The current counter value is read from and written to the `count.txt` file in various endpoints to ensure persistence.

## Error Handling
- Errors in reading or writing the `count.txt` file are logged to the console and return a `500 Internal Server Error` response.
- Invalid values in the `count.txt` file result in a `400 Bad Request` response.

## Conclusion
This API provides a simple and effective way to manage a counter through HTTP GET requests, with functionalities to increment, reset, and retrieve the current counter value. The counter state is persisted in a file and monitored for changes, ensuring that the API remains synchronized with the file's contents.