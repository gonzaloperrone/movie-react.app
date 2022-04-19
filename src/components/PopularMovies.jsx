import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImages } from '../utils/getImages';
import { Link } from 'react-router-dom';
import './PopularMovies.css';

import { Autoplay, Pagination, Navigation } from "swiper";

export function PopularMovies() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        movies()
    }, [])

    const movies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=23e2a196fe53e5fe802fd31347229e6a')
        const movieData = await data.json()
        setMovie(movieData.results)
    }

    return (
        <div className="popularMovies">
            <h1 className="movieTitle">Popular Movies</h1>
            <div className="movieLinkBox">
                <Link className="movieLink" to="/moviesGrid">See more...</Link>
            </div>
            <div className="movieSwiperBox ">
                <div className="movieSwiperContainer">
                    <Swiper
                        className="swiper"
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={1}
                        grabCursor={true}
                        slidesPerView={"auto"}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                    >
                        {movie.map((movieInfo) => (
                            <SwiperSlide key={movieInfo.id}>
                                <Link to={"/movies/" + movieInfo.id}>
                                    <img title={movieInfo.originalTitle} src={`${getImages(movieInfo.poster_path, 500)}`} alt={movieInfo.originalTitle} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}