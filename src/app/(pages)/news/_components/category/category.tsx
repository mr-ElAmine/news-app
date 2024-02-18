interface DataItem {
  label: string;
  value: string;
}

export default function Category() {
  const category: DataItem[] = [
    { label: "Business", value: "business" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Environment", value: "environment" },
    { label: "Food", value: "food" },
    { label: "Health", value: "health" },
    { label: "Politics", value: "politics" },
    { label: "Science", value: "science" },
    { label: "Sports", value: "sports" },
    { label: "Technology", value: "technology" },
    { label: "Top", value: "top" },
    { label: "Tourism", value: "tourism" },
    { label: "World", value: "world" },
  ];
  return category;
}
