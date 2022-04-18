import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import { getImages } from "../utils/getImages";

export function MovieCard({ movie }) {
    const imgUrl = getImages(movie.poster_path, 300)

    return (
        <li className={styles.movieCard}>
            <Link to={"/movies/" + movie.id}>
                <img
                    width={230}
                    height={345}
                    className={styles.movieImg}
                    src={imgUrl}
                    alt={movie.title}
                />
                <div className={styles.movieInfo}>
                    <div className={styles.movieTitle}>{movie.title}</div>
                    <div className={styles.movieDate}>{movie.release_date}</div>
                </div>
            </Link>
        </li>
    );
}
