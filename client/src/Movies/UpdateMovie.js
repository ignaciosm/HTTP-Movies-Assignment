import React, {useState, useEffect} from 'react'
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: '',
  // stars: []
};

  
const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialItem)
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    // if (e.target.name === 'metascore') {
    //   value = parseInt(value, 10);
    // }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  console.log('change', movie)

  useEffect(() => {
    // only set the state if we have data from the api
    // Solves refresh race condition
    if (props.movies.length > 0) {
      const newMovie = props.movies.find(
        thing => `${thing.id}` === props.match.params.id
      );
      setMovie(newMovie);
    }
  }, [props.movies, props.match.params.id]);

  const handleSubmit = e => {
    // PUT request
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.setMovies(res.data);
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };

  // loading state if we don't have data yet
  if (props.movies.length === 0) {
    return <h2>Loading data...</h2>;
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />

        {/* <input
          type="number"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        /> */}

        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateMovie
