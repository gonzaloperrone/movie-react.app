import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImages } from '../utils/getImages';
import { Link } from 'react-router-dom';
import './PopularTv.css';
import { Autoplay, Pagination, Navigation } from "swiper";

export function PopularTv() {

    const [tv, setTv] = useState([]);

    useEffect(() => {
        popularTv()
    }, [])

    const popularTv = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=23e2a196fe53e5fe802fd31347229e6a')
        const tvData = await data.json()
        setTv(tvData.results)
    }

    return (
        <div className="popularTv">
            <h1 className="TvTitle">Popular Series</h1>
            <div className="tvLinkBox">
                <Link className="tvLink" to="/tvGrid">See more...</Link>
            </div>
            <div className="TvSwiperBox ">
                <div className="TvSwiperContainer">
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
                        {tv.map((tvInfo) => (
                            <SwiperSlide key={tvInfo.id}>
                                <Link to={"/tv/" + tvInfo.id}>
                                    <img src={`${getImages(tvInfo.poster_path, 500)}`} alt={tvInfo.id} />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}