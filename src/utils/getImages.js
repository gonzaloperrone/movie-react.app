import placeholder from "../placeholder.png";

export function getImages(path, width) {
   return path ? `https://image.tmdb.org/t/p/w${width}${path}` : placeholder;
}