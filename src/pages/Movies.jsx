import { MoviesGrid } from "./MoviesGrid";
import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export function Movies() {
    const [query] = useSearchParams();
    const search = query.get("search");

    const debouncedSearch = useDebounce(search, 500)

    return(
        <div>
            <h1 className="gridTitle">Movies</h1>
            <Search />
            <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
        </div>
        
    )
} 