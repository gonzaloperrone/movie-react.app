import React from 'react';
import styles from './Search.module.css';
import { FaSearch } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom';

export function Search() {

    const [query, setQuery] = useSearchParams();
    const search = query.get("search")

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={styles.searchBox}>
                <input
                    className={styles.searchInput}
                    type="text"
                    aria-label='Search...'
                    value={search ?? ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        setQuery({search: value})
                    }} 
                    placeholder="Search movie..."/>
                    <FaSearch size={20} className={styles.searchButton}/>
            </div>
        </form>
    )
}
