import  { PopularMovies }  from '../components/PopularMovies';
import { PopularTv } from '../components/PopularTv';

export function LandingPage() {

   

    return (
        <div>
            <div> 
           <PopularMovies />
           <PopularTv />
          </div> 
        </div>
    )
}