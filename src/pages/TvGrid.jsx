import { useEffect, useState } from 'react';
import { get } from "../utils/httpClient";
import { TvCard } from '../components/TvCard';
import styles from './TvGrid.module.css';
import { Spinner } from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Empty } from '../components/Empty';
import { ScrollToTop } from '../utils/ScrollToTop';

export function TvGrid({ search }) {
    const [tv, setTv] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      setIsLoading(true);
      const searchTvUrl = search
        ? "/search/tv?query=" + search + "&page=" + page
        : "/discover/tv?page=" + page;
      get(searchTvUrl).then((data) => {
        setTv((prevTv) => prevTv.concat(data.results));
        setHasMore(data.page < data.total_pages);
        setIsLoading(false);
      });
    }, [search, page]);

    if(!isLoading && tv.length === 0){
      return <Empty />
    }
  
    return (
      <div>
      <InfiniteScroll
        dataLength={tv.length}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<Spinner />}
      >
        <ul className={styles.TvGrid}>
          {tv.map((tv) => (
            <TvCard key={tv.id} tv={tv} />
          ))}
        </ul>
      </InfiniteScroll>
      <ScrollToTop />
      </div>
    );
  }