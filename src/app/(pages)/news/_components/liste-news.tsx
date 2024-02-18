import { NewsApiResponse } from "@/lib/interfaces";
import ItemNews from "./item-news";

export default function ListeNews({ dataNews }: { dataNews: NewsApiResponse }) {
  return (
    <div className="py-4 shadow-none gap-4 flex flex-col">
      <div className="font-semibold flex flex-row gap-2 text-2xl">
        <p>Total Results :</p>
        <p>{dataNews.totalResults}</p>
      </div>
      {dataNews.results.map((news, index) => (
        <ItemNews key={index} article={news} />
      ))}
    </div>
  );
}
