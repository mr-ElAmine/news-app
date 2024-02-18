import { Article } from "@/lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chip } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function ItemNews({ article }: { article: Article }) {
  const queryParams = new URLSearchParams(location.search);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      className="border-2 hover:border-gray-200 hover:bg-gray-100"
      onClick={() => {
        queryParams.set("id", article.article_id);
        router.push(pathname + "?" + queryParams);
      }}
      role="button"
    >
      <CardHeader className="p-4">
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>
          <div className="flex justify-between">
            {article.pubDate.replaceAll("-", "/")}
            <div className="text-sm font-semibold">
              {article.language.toLocaleUpperCase()}
            </div>
          </div>
          <div>{article.creator}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-base overflow-hidden">
          {article.description ? (
            <div className="text-gray-700">
              {article.description?.replace(/<[^>]*>/g, "")}
            </div>
          ) : (
            <div>
              {article.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-3 w-full justify-end">
          {article.category?.map((category: string) => (
            <Chip key={category} color="warning" variant="dot">
              {category}
            </Chip>
          ))}
          {article.country?.map((country: string) => (
            <Chip key={country} color="success" variant="dot">
              {country}
            </Chip>
          ))}
          {article.keywords?.map((keywords: string) => (
            <Chip key={keywords} color="danger" variant="dot">
              {keywords}
            </Chip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
