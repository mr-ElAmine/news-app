"use client";
import { DataItem } from "@/lib/interfaces";
import { Select, Space } from "antd";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MultiSelect({
  dataOptions,
  maxCount,
  placeholder,
  queryParm,
  loading,
}: {
  dataOptions: DataItem[];
  maxCount: number;
  placeholder: string;
  queryParm: string;
  loading: boolean;
}) {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathname = usePathname();

  const [options, setOptions] = useState<DataItem[]>(dataOptions);

  const defaultValue = queryParams.get(queryParm);
  const selectDefaultValue = defaultValue ? defaultValue.split(",") : [];

  const handleChange = (value: string[]) => {
    if (value.length >= maxCount) {
      const filteredData: DataItem[] = dataOptions.filter((item) =>
        value.includes(item.value.toString())
      );
      setOptions(filteredData);
    } else {
      setOptions(dataOptions);
    }
    if (value.length === 0) {
      queryParams.delete(queryParm);
    } else {
      queryParams.set(queryParm, value.toString());
    }
    router.push(pathname + "?" + queryParams);
  };

  return (
    <Space className="w-full" direction="vertical">
      <Select
        disabled={loading}
        loading={loading}
        className="w-full"
        mode="multiple"
        size="large"
        allowClear
        placeholder={`${placeholder}`}
        defaultValue={selectDefaultValue}
        onChange={handleChange}
        options={options}
        maxTagCount={maxCount}
      />
    </Space>
  );
}
