# Visitor Counter API

The Count API is a simple API that manages a count stored in a file on the server. It allows you to get the current count, increment the count, reset the count, and handle preflight CORS requests.

## Base URL

```
https://your-domain.com/api/count
```

## Endpoints

### 1. Get Current Count

Returns the current count stored in the server.

- **URL**

  ```
  GET /api/count
  ```

- **Success Response**

  - **Code:** 200
  - **Content:**
    ```json
    {
      "value": 5
    }
    ```

- **Error Response**

  - **Code:** 500
  - **Content:** `Error reading file`

### 2. Increment Count

Increments the current count by 1 and returns the updated count.

- **URL**

  ```
  GET /api/count?q=increment
  ```

- **Success Response**

  - **Code:** 200
  - **Content:**
    ```json
    {
      "value": 6
    }
    ```

- **Error Response**

  - **Code:** 500
  - **Content:** `Error reading or writing file`

### 3. Reset Count

Resets the count to 0.

- **URL**

  ```
  GET /api/count?q=reset
  ```

- **Success Response**

  - **Code:** 200
  - **Content:**
    ```json
    {
      "value": 0
    }
    ```

- **Error Response**

  - **Code:** 500
  - **Content:** `Error writing file`

### 4. CORS Preflight

Handles CORS preflight requests.

- **URL**

  ```
  OPTIONS /api/count
  ```

- **Success Response**

  - **Code:** 200
  - **Content:** `Preflight OK`

### 5. Error Response

Handles invalid requests and unsupported methods.

- **URL**

  ```
  Any other method or invalid query parameters
  ```

- **Error Response**

  - **Code:** 405
  - **Content:** `Method Not Allowed`

## Usage

- **Example: Get Current Count**
  ```bash
  curl -X GET https://your-domain.com/api/count
  ```

- **Example: Increment Count**
  ```bash
  curl -X GET https://your-domain.com/api/count?q=increment
  ```

- **Example: Reset Count**
  ```bash
  curl -X GET https://your-domain.com/api/count?q=reset
  ```

- **Example: Preflight Request**
  ```bash
  curl -X OPTIONS https://your-domain.com/api/count
  ```

## Notes

- The count is stored in a file on the server.
- Requests are CORS-enabled to allow all origins.
- Supported HTTP methods: GET, OPTIONS

---