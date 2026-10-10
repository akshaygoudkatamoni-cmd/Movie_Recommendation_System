const fs = require("fs");
const mysql = require("mysql2/promise");

async function insertMovies() {
    const data = fs.readFileSync("movies_good.json", "utf-8");
    const movies = JSON.parse(data);

    require("dotenv").config();

    const connection = await mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
    });

    try {
        const values = movies.map(movie => [
            movie.movie_id,
            movie.industry,
            movie.title,
            movie.genre,
            movie.rating,
            movie.cast,
            movie.director,
            movie.movie_poster
        ]);

        await connection.query(
            `INSERT INTO movies
            (id, industry, name, genre, rating, cast, director, poster)
            VALUES ?`,
            [values]
        );

        console.log(`${movies.length} movies inserted successfully!`);
    } catch (error) {
        console.error(error);
    } finally {
        await connection.end();
    }
}



insertMovies();