import placeholder from "../placeholder.png";

export function originalImg(path) {
   return path ? `https://image.tmdb.org/t/p/original${path}` : placeholder;
}