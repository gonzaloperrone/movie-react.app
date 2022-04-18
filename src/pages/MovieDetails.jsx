import { useParams } from 'react-router';
import { MovieCredits } from '../components/MovieCredits';
import styles from "./MovieDetails.module.css";
import { get } from '../utils/httpClient';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { getImages } from '../utils/getImages';
import { originalImg } from '../utils/originalImg.js';
import { BsFillStarFill } from 'react-icons/bs';
import { MdAccessTimeFilled, MdDescription, MdVideoCameraFront, MdCalendarToday, MdArrowBack } from 'react-icons/md';
import { SimilarMovies } from '../components/SimilarMovies';
import { useNavigate } from 'react-router-dom';

export function MovieDetails() {
    
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        setIsLoading(true);

        get("/movie/" + movieId).then(data => {
            setMovie(data);
            setIsLoading(false);
        })
    }, [movieId]);

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    const imgUrl = getImages(movie.poster_path, 500);
    const imgUrlBack = originalImg(movie.backdrop_path);

    const adult = function () {
        if (movie.adult === true) {
            return <div>(+18)</div>
        } else {
            return <div></div>
        }
    }

    return (
        <div>
            <div className={styles.detailsContainer} style={{ backgroundImage: `url(${imgUrlBack})` }}>
                <div className={styles.detailsContainer2}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>Go back</button>
                    <img className={`${styles.col} ${styles.movieImg}`} src={imgUrl} alt={movie.title} />
                    <div className={`${styles.col} ${styles.movieDetails}`}>
                    <button className={styles.backBtn1} onClick={() => navigate(-1)}><MdArrowBack /> Go back</button>
                        <h1 className={styles.firstItem}>
                            {movie.title}<br />
                            <span className={styles.tagline}>{movie.tagline}</span>
                            <span className={styles.adult}>{adult()}</span>
                        </h1><hr />
                        <div className={styles.movieInfoDetails}>
                            <p>
                                <strong><MdCalendarToday className={styles.icon} />Release date</strong><br />
                                {movie.release_date}
                            </p><hr />
                            <p>
                                <strong><MdVideoCameraFront className={styles.icon} />Genres</strong><br />
                                {movie.genres.map(genre => genre.name).join(" | ")}
                            </p><hr />
                            <p>
                                <strong><BsFillStarFill className={styles.icon} />Rating</strong><br />
                                {movie.vote_average}/10
                            </p><hr />
                            <p>
                                <strong><MdAccessTimeFilled className={styles.icon} />Duration</strong><br />
                                {movie.runtime} minutes
                            </p><hr />
                        </div>
                        <div className={styles.description}>
                            <p>
                                <strong><MdDescription className={styles.icon} />Description</strong><br />
                                {movie.overview}
                            </p>
                        </div>
                        <hr />
                        <div className={styles.creditsContainer}>
                            <h3 className={styles.castTitle}>Cast</h3>
                            <div className={styles.credits}><MovieCredits />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.similarMoviesContainer}>
                    <div className={styles.similarMovies}>
                        <h3>Recommendations</h3><hr />
                        <SimilarMovies />
                    </div>
                </div>
            </div>
        </div>
    )
}