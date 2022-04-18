import { TvGrid } from "./TvGrid";
import { SearchTv } from "../components/SearchTv";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export function Tv() {
    const [query] = useSearchParams();
    const search = query.get("search");

    const debouncedSearch = useDebounce(search, 500)

    return (
        <div>
            <h1 className="gridTitle">Series & TV</h1>
            <SearchTv />
            <TvGrid key={debouncedSearch} search={debouncedSearch} />
        </div>

    )
} 