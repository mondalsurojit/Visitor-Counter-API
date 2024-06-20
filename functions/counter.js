const fs = require('fs');
const path = require('path');

let fileData = '';
const countFilePath = path.join(__dirname, '../count.txt');

exports.handler = async (event, context) => {
    const { httpMethod, queryStringParameters } = event;

    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (httpMethod === 'OPTIONS') {
        // Respond to preflight CORS requests
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK',
        };
    }

    if (httpMethod === 'GET') {
        if (!queryStringParameters || !queryStringParameters.q || queryStringParameters.q === '') {
            // Read the current count from the file
            try {
                const data = fs.readFileSync(countFilePath, 'utf8');
                let currentCount = parseInt(data, 10);
                if (isNaN(currentCount)) {
                    throw new Error('Invalid count value in file');
                }
                currentCount += 1;

                // Write the new count back to the file
                fs.writeFileSync(countFilePath, currentCount.toString());

                fileData = currentCount.toString(); // Update the in-memory count
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ value: currentCount }),
                };
            } catch (err) {
                console.error('Error reading or writing file:', err);
                return {
                    statusCode: 500,
                    headers,
                    body: 'Error reading or writing file',
                };
            }
        } else if (queryStringParameters.q === 'reset') {
            // Reset the count
            try {
                fs.writeFileSync(countFilePath, '0');
                fileData = '0'; // Update the in-memory count
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ value: 0 }),
                };
            } catch (err) {
                console.error('Error writing file:', err);
                return {
                    statusCode: 500,
                    headers,
                    body: 'Error writing file',
                };
            }
        } else {
            // Return current count
            const data = fs.readFileSync(countFilePath, 'utf8');
            let currentCount = parseInt(data, 10);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ value: currentCount }),
            };
        }
    } else {
        return {
            statusCode: 405,
            headers,
            body: 'Method Not Allowed',
        };
    }
};
