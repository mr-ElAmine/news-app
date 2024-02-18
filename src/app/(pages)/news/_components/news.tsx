"use client";
import { useEffect, useMemo, useState } from "react";
import Select from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GetNews from "@/lib/action";
import { NewsApiResponse } from "@/lib/interfaces";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import ListeNews from "./liste-news";
import { Button } from "@nextui-org/react";
import Article from "./article";

export default function News() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [leftDisabled, setLeftDisabled] = useState<boolean>(false);
  const [rightDisabled, setRightDisabled] = useState<boolean>(false);

  const [dataNews, setDataNews] = useState<undefined | NewsApiResponse>(
    undefined
  );
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const search_query = queryParams.get("q");
  const category_query = queryParams.get("category");
  const country_query = queryParams.get("country");
  const language_query = queryParams.get("language");
  const id_query = queryParams.get("id");
  let pages_query = queryParams.get("pages");

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleNews = async () => {
    queryParams.delete("pages");
    router.push(pathname + "?" + queryParams);
    handleData();
  };

  const handleData = async () => {
    pages_query = queryParams.get("pages");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    await setDataNews(
      await GetNews({
        search: search_query,
        category: category_query,
        country: country_query,
        language: language_query,
        pages: pages_query,
      })
    );
    setLoading(false);
  };

  async function Left() {
    if (dataNews) {
      let pages = queryParams.get("pages");
      let queryPages = [];
      if (pages) {
        queryPages = pages?.split(",").slice(0, -1);
        queryParams.set("pages", queryPages.join(","));
        if (queryPages.length === 0) {
          queryParams.delete("pages");
        }
        router.push(pathname + "?" + queryParams);
        handleData();
      }
    }
  }

  async function Right() {
    if (dataNews) {
      let pages = queryParams.get("pages");
      let queryPages = "";
      queryPages = `${dataNews.nextPage}`;
      if (pages) {
        queryPages = `${pages},${dataNews.nextPage}`;
      }
      queryParams.set("pages", queryPages);
      router.push(pathname + "?" + queryParams);

      handleData();
    }
  }

  useEffect(() => {
    if (dataNews === undefined) {
      handleData();
    }
    pages_query = queryParams.get("pages");
    setRightDisabled(true);
    setLeftDisabled(true);

    if (pages_query) {
      setLeftDisabled(false);
    }
    if (dataNews?.nextPage) {
      setRightDisabled(false);
    }
  }, [dataNews]);

  document.title = `The Cude: News`;

  return (
    <div className="flex flex-col justify-between h-full">
      {!id_query && (
        <Select
          loading={loading}
          onSearch={handleNews}
          onOpenFilter={handleOpenFilter}
          openFilter={openFilter}
        />
      )}

      {dataNews ? (
        <div className="h-full">
          {id_query ? (
            <Article articles={dataNews} id={id_query} />
          ) : (
            <div>
              <ListeNews dataNews={dataNews} />
              {dataNews.results.length > 0 && (
                <div className="flex flex-row gap-10 justify-center pb-4">
                  <Button
                    disabled={leftDisabled}
                    isIconOnly
                    radius="full"
                    size="lg"
                    variant={`${leftDisabled ? "flat" : "faded"}`}
                    aria-label="Take a photo"
                    onClick={() => {
                      Left();
                    }}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    disabled={rightDisabled}
                    isIconOnly
                    radius="full"
                    size="lg"
                    variant={`${rightDisabled ? "flat" : "faded"}`}
                    aria-label="Take a photo"
                    onClick={() => {
                      Right();
                    }}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
