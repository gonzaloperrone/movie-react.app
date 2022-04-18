import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { getImages } from '../utils/getImages';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";

export function SimilarTv() {

    const [similarTv, setSimilarTv] = useState([]);
    const { tvId } = useParams();


    useEffect(() => {
        similarVideoConst()
    }, [])

    const similarVideoConst = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations?api_key=23e2a196fe53e5fe802fd31347229e6a&language=en-US&page=1`)
        const similarTvData = await data.json()
        setSimilarTv(similarTvData.results)
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
                {similarTv.map((tv) => (
                        <SwiperSlide key={tv.id}>
                            <Link to={"/tv/" + tv.id}>
                                <img title={tv.originalTitle} src={`${getImages(tv.poster_path, 500)}`} alt={tv.id} />
                            </Link>
                        </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
