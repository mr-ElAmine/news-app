"use client";
import { Button } from "@nextui-org/react";
import Category from "./category/category";
import Country from "./country/country";
import Language from "./language/language";
import MultiSelect from "./multi-select";
import { Search, Sliders } from "lucide-react";
import { DataItem } from "@/lib/interfaces";
import InputSelect from "./input";

export default function Select({
  loading,
  onSearch,
  onOpenFilter,
  openFilter,
}: {
  loading: boolean;
  onSearch: () => void;
  onOpenFilter: () => void;
  openFilter: boolean;
}) {
  const dataOptionsCategory: DataItem[] = Category();
  const dataOptionsCountry: DataItem[] = Country();
  const dataOptionsLanguage: DataItem[] = Language();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 sm:flex-row flex-col">
        <InputSelect loading={loading} />
        <div className="flex gap-3">
          <Button
            disabled={loading}
            isLoading={loading}
            radius="sm"
            variant="solid"
            className="w-3/4"
            onClick={onSearch}
          >
            {loading ? "" : <Search />}
          </Button>
          <Button
            disabled={loading}
            isLoading={loading}
            radius="sm"
            variant="bordered"
            className="w-1/4"
            onClick={onOpenFilter}
          >
            {loading ? "" : <Sliders />}
          </Button>
        </div>
      </div>
      {openFilter && (
        <div className="flex gap-3 lg:flex-row flex-col">
          <MultiSelect
            dataOptions={dataOptionsLanguage}
            maxCount={5}
            placeholder="Select a Language"
            queryParm="language"
            loading={loading}
          />
          <MultiSelect
            dataOptions={dataOptionsCategory}
            maxCount={5}
            placeholder="Select a Category"
            queryParm="category"
            loading={loading}
          />
          <MultiSelect
            dataOptions={dataOptionsCountry}
            maxCount={5}
            placeholder="Select a Country"
            queryParm="country"
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
