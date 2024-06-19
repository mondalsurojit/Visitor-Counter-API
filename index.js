const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

let fileData = '';

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Read the file initially
fs.readFile('./count.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        fileData = '0';
        return;
    }
    console.log('Initial file data:', data);
    fileData = data;
});

// Watch for changes in the file
fs.watch('./count.txt', (eventType, filename) => {
    if (eventType === 'change') {
        fs.readFile('./count.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            console.log('File changed:', data);
            fileData = data;
        });
    }
});

app.get('/', (req, res) => {
    if (!req.query.q || req.query.q === '') {
        // Read the current count from the file
        fs.readFile('./count.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Error reading file');
            }

            // Parse the current count and increment it
            let currentCount = parseInt(data, 10);
            if (isNaN(currentCount)) {
                return res.status(400).send('Invalid count value in file');
            }
            currentCount += 1;

            // Write the new count back to the file
            fs.writeFile('./count.txt', currentCount.toString(), err => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Error writing file');
                }
                console.log('File written successfully');
                fileData = currentCount.toString(); // Update the in-memory count
                res.json({ value: currentCount });
            });
        });
    } else if (req.query.q === 'reset') { // Check if the 'q' query parameter is set to 'reset'
        fs.writeFile('./count.txt', '0', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            console.log('File reset successfully');
            fileData = '0'; // Update the in-memory count
            return res.json({ value: 0 });
        });
    } else {
        let currentCount = parseInt(fileData, 10);
        if (isNaN(currentCount)) {
            currentCount = 0;
        }
        res.json({ value: currentCount });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




// let movies = [
//     { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
//     { id: 2, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 },
//     { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 }
// ];

// // Root URL
// app.get('/', (req, res) => {
//     res.send('Welcome to the Movie API!');
// });

// // Get all movies
// app.get('/movies', (req, res) => {
//     res.json(movies);
// });

// // Get a movie by ID
// app.get('/movies/:id', (req, res) => {
//     const movie = movies.find(m => m.id === parseInt(req.params.id));
//     if (!movie) return res.status(404).send('Movie not found');
//     res.json(movie);
// });

// Create a new movie
// app.post('/movies', (req, res) => {
//     const { title, director, year } = req.body;
//     const newMovie = {
//         id: movies.length + 1,
//         title,
//         director,
//         year
//     };
//     movies.push(newMovie);
//     res.status(201).json(newMovie);
// });

// Update a movie
// app.put('/movies/:id', (req, res) => {
//     const movie = movies.find(m => m.id === parseInt(req.params.id));
//     if (!movie) return res.status(404).send('Movie not found');

//     const { title, director, year } = req.body;
//     movie.title = title;
//     movie.director = director;
//     movie.year = year;

//     res.json(movie);
// });

// Delete a movie
// app.delete('/movies/:id', (req, res) => {
//     const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
//     if (movieIndex === -1) return res.status(404).send('Movie not found');

//     movies.splice(movieIndex, 1);
//     res.status(204).send();
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
