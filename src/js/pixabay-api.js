import axios from "axios";
    
axios.defaults.baseURL = "https://pixabay.com/api/";

const API_KEY = "54667544-34f53a0b28c965f6e0120a2cf";

export function getImagesByQuery(query) {
  return axios.get("", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: 1,
      per_page:9,
    },
  });
}