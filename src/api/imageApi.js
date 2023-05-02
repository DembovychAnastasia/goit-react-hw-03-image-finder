
export function fetchImages (query, page=1) {

    const KEY = '34601411-5a068c4760602afda1223d229';
    const MAIN_URL = `https://pixabay.com/api/`;
    return fetch(`${MAIN_URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`).then(response => response.json());
}
