import { useParams } from 'react-router';
import styles from "./TvDetails.module.css";
import { get } from '../utils/httpClient';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { getImages } from '../utils/getImages';
import { originalImg } from '../utils/originalImg.js';
import { BsFillStarFill } from 'react-icons/bs';
import { MdAccessTimeFilled, MdDescription, MdVideoCameraFront, MdCalendarToday, MdArrowBack } from 'react-icons/md';
import { TvCredits } from '../components/TvCredits';
import { SimilarTv } from '../components/SimilarTv';
import { useNavigate } from 'react-router-dom';

export function TvDetails() {
    const { tvId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [tv, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        setIsLoading(true);

        get("/tv/" + tvId).then(data => {
            setMovie(data);
            setIsLoading(false);
        })
    }, [tvId]);

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    const imgUrl = getImages(tv.poster_path, 500);
    const imgUrlBack = originalImg(tv.backdrop_path);

    const adult = function () {
        if (tv.adult === true) {
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
                    <img className={`${styles.col} ${styles.movieImg}`} src={imgUrl} alt={tv.title} />
                    <div className={`${styles.col} ${styles.movieDetails}`}>
                    <button className={styles.backBtn1} onClick={() => navigate(-1)}><MdArrowBack /> Go back</button>
                        <h1 className={styles.firstItem}>
                            {tv.original_name}<br />
                            <span className={styles.tagline}>({tv.number_of_seasons} Seasons - {tv.number_of_episodes} Episodes)</span>
                            <span className={styles.adult}>{adult()}</span>
                        </h1><hr />
                        <div className={styles.movieInfoDetails}>
                            <p>
                                <strong><MdVideoCameraFront className={styles.icon} />Genres</strong><br />
                                {tv.genres.map(genre => genre.name).join(" | ")}
                            </p><hr />
                            <p>
                                <strong><MdVideoCameraFront className={styles.icon} />Networks</strong><br />
                                {tv.networks.map(network => network.name).join(" | ")}</p><hr />
                            <p>
                                <strong><BsFillStarFill className={styles.icon} />Rating</strong><br />
                                {tv.vote_average}/10
                            </p><hr />
                        </div>
                        <div className={styles.description}>
                            <p>
                                <strong><MdDescription className={styles.icon} />Description</strong><br />
                                {tv.overview}
                            </p>
                        </div>
                        <hr />
                        <div className={styles.creditsContainer}>
                            <h3 className={styles.castTitle}>Cast</h3>
                            <div className={styles.credits}><TvCredits />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.similarMoviesContainer}>
                    <div className={styles.similarMovies}>
                        <h3>Recommendations</h3><hr />
                        <SimilarTv />
                    </div>
                </div>
            </div>
        </div>
    )
}