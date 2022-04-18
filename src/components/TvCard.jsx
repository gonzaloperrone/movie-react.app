import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import { getImages } from "../utils/getImages";

export function TvCard({ tv }) {
    const imgUrl = getImages(tv.poster_path, 300)

    return (
        <li className={styles.movieCard}>
            <Link to={"/tv/" + tv.id}>
                <img
                    width={230}
                    height={345}
                    className={styles.movieImg}
                    src={imgUrl}
                    alt={tv.title}
                />
                <div className={styles.movieInfo}>
                    <div className={styles.movieTitle}>{tv.name}</div>
                    <div className={styles.movieDate}>{tv.release_date}</div>
                </div>
            </Link>
        </li>
    );
}
