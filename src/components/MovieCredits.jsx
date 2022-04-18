import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { getImages } from '../utils/getImages';
import styles from './MovieCredits.module.css';
import "swiper/css";
import "swiper/css/pagination";

export function MovieCredits() {

    const [credits, setCredit] = useState([]);
    const { movieId } = useParams();


    useEffect(() => {
        creditsConst()
    }, [])

    const creditsConst = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=23e2a196fe53e5fe802fd31347229e6a&language=en-US`)
        const movieCredits = await data.json()
        setCredit(movieCredits.cast)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.row}>
                    {credits.map((credit, id) => (
                        <div key={id} className={styles.card} >
                       <img className={styles.img} src={`${getImages(credit.profile_path, 500)}`} alt={credit.name} />
                        <h5>{credit.name}</h5>
                        <p className={styles.name}>{credit.character}</p>
                      </div>
                        
                    ))}

                </div>
            </div>

        </>
    );
}