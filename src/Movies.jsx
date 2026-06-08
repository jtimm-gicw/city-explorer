// Lab 8: Create a Movies component to display movies

export default function Movies({ movies = [] }) {
  return (
    <section className="movies-section">
      <h2>Movies Related to This City</h2>

      <div className="movies-container">
        {movies.map((movie, index) => (
          <div className="card" key={index}>
            <h3>{movie.title || 'No Title Available'}</h3>

            <img
              src={movie.image_url}
              alt={movie.title || 'movie poster'}
            />

            <p>{movie.overview}</p>

            <p>⭐ {movie.average_votes}</p>
            <p>Votes: {movie.total_votes}</p>
            <p>Released: {movie.released_on}</p>
          </div>
        ))}
      </div>
    </section>
  );
}// Once complete, import and use this component in Explore.jsx, passing in the movies state as a prop.