import { keys, NewsApiResponse } from "./interfaces";

export default async function GetNews({
  search,
  category,
  country,
  language,
  pages,
}: {
  search: string | null;
  category: string | null;
  country: string | null;
  language: string | null;
  pages: string | null;
}) {
  let result: NewsApiResponse | undefined;
  let success = false;
  const maxRetries = 10;
  let querys = "";

  if (search) {
    querys += `&q=${search}`;
  }
  if (category) {
    querys += `&category=${category}`;
  }
  if (country) {
    querys += `&country=${country}`;
  }
  if (language) {
    querys += `&language=${language}`;
  }
  if (pages) {
    querys += `&page=${pages?.split(",")[pages?.split(",").length - 1]}`;
  }

  for (let i = 0; i < maxRetries && !success; i++) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    try {
      const url = `https://newsdata.io/api/1/news?apikey=pub_${keys[randomIndex]}${querys}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "success") {
        result = data;
        success = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error("Error fetching news");
    }
  }

  return result;
}
