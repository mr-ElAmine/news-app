import { Input } from "antd";
import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function InputSelect({ loading }: { loading: boolean }) {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams?.toString());  const router = useRouter();
  const pathname = usePathname();
  const defaultValue = queryParams.get("q");
  const selectDefaultValue = defaultValue ? defaultValue : "";

  const handleChange = (value: string) => {
    if (value.length === 0) {
      queryParams.delete("q");
    } else {
      queryParams.set("q", value.toString());
    }

    router.push(pathname + "?" + queryParams);
  };

  return (
    <Input
      defaultValue={selectDefaultValue}
      disabled={loading}
      allowClear
      placeholder="Search your news"
      size="large"
      prefix={
        loading ? (
          <Loader2 className="animate-spin mr-2" />
        ) : (
          <Search className="mr-2" />
        )
      }
      onChange={(e) => handleChange(e.target.value.toString())}
    />
  );
}
