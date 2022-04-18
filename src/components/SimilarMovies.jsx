import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { getImages } from '../utils/getImages';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

export function SimilarMovies() {

    const [similarMovie, setSimilarMovie] = useState([]);
    const { movieId } = useParams();


    useEffect(() => {
        similarVideoConst()
    }, [])

    const similarVideoConst = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=23e2a196fe53e5fe802fd31347229e6a&language=en-US&page=1`)
        const similarMovieData = await data.json()
        setSimilarMovie(similarMovieData.results)
    }

    return (
        <>
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
                {similarMovie.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={"/movies/" + movie.id}>
                                <img title={movie.originalTitle} src={`${getImages(movie.poster_path, 500)}`} alt={movie.id} />
                            </Link>
                        </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
