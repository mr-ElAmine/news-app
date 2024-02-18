import { Article, NewsApiResponse } from "@/lib/interfaces";
import { Button, Chip } from "@nextui-org/react";
import { ExternalLink, MoveLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Article({
  articles,
  id,
}: {
  articles: NewsApiResponse;
  id: string;
}) {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams?.toString());
  const router = useRouter();
  const pathname = usePathname();

  const articles_id = articles.results.find(
    (article) => article.article_id === id
  );

  document.title = `The Cude: News - ${articles_id?.title}`;

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex w-full justify-between">
        <Button
          radius="sm"
          variant="flat"
          size="lg"
          onClick={() => {
            queryParams.delete("id");
            router.push(pathname + "?" + queryParams);
          }}
        >
          <MoveLeft size={40} />
        </Button>
        {articles_id?.link && (
          <a href={articles_id.link} target="_blank" rel="noopener noreferrer">
            <Button
              radius="sm"
              variant="solid"
              size="lg"
              href={articles_id.link}
            >
              <ExternalLink size={30} />
            </Button>
          </a>
        )}
      </div>
      {articles_id ? (
        <div className="flex flex-col justify-center items-center h-full">
          <meta property="og:title" content={articles_id.title} />
          {articles_id.description ? (
            <meta
              property="og:description"
              content={articles_id.description?.replace(/<[^>]*>/g, "")}
            />
          ) : (
            <meta
              property="og:description"
              content={`${articles_id.content
                .replace(/<[^>]*>/g, "")
                .substring(0, 150)}
              ...`}
            />
          )}

          <div className="p-4 border-2 rounded-sm max-w-7xl">
            <p className="text-4xl font-medium">{articles_id.title}</p>
            <div className="text-base my-2">
              {articles_id.description ? (
                <div className="text-gray-700 my-2">
                  {articles_id.description?.replace(/<[^>]*>/g, "")}
                </div>
              ) : (
                <div>
                  {articles_id.content
                    .replace(/<[^>]*>/g, "")
                    .substring(0, 150)}
                  ...
                </div>
              )}
              <div className="text-sm font-semibold my-2 text-gray-700">
                <div>{articles_id.pubDate.replaceAll("-", "/")}</div>
                <div>{articles_id.language.toLocaleUpperCase()}</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold overflow-hiddenw w-full text-right">
                {articles_id.creator || "Unknown Creator"}
              </div>
              <div className="flex flex-wrap gap-3 w-full justify-end py-1">
                {articles_id.category?.map((category: string) => (
                  <Chip key={category} color="warning" variant="dot">
                    {category}
                  </Chip>
                ))}
                {articles_id.country?.map((country: string) => (
                  <Chip key={country} color="success" variant="dot">
                    {country}
                  </Chip>
                ))}
                {articles_id.keywords?.map((keywords: string) => (
                  <Chip key={keywords} color="danger" variant="dot">
                    {keywords}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <title>The Cude: 404 - Not Found</title>
          The news you are requesting does not exist
        </div>
      )}
    </div>
  );
}
