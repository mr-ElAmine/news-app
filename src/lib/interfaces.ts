export interface DataItem {
  label: string;
  value: string;
}

export interface Article {
  article_id: string;
  category: string[];
  content: string;
  country: string[];
  ai_tag: string;
  creator: string | null;
  description: string | null;
  image_url: string | null;
  keywords: string[] | null;
  language: string;
  link: string | null;
  pubDate: string;
  source_id: string | null;
  source_priority: number | null;
  title: string;
  video_url: string | null;
}

export interface NewsApiResponse {
  nextPage: string;
  results: Article[];
  status: string;
  totalResults: number;
}

export const keys = [
  "352851f6559df2e1a4edc158fc77b2f9f27cf",
  "35239956dc74ad168085b4bf84923d953b2e4",
  "25264854db35c963b342f86ccd89f697f74fc",
  "352581f61e05092e260ff1ae7de82d67bcfaa",
  "3526999a582516d928474d267d8d0c8294739",
  "35270566f0b677cade174d43d690c8da7ac52",
  "3527106b2abd141c278b58cbb12b0f51dd3a7",
  "35272fa57bb5ab33acd161852a8c4b1104694",
  "352736f576b87b7a4cad303271e3a99a247d3",
  "352750b01f226871c246850523d16cc2bb566",
  "3527671b11cc05b10e4577a470fda8fd643af",
  "352778032122e7a9293e8cea4af9edd40fed0",
  "35279846aca2a8a6cbdcd6fc1b5f8f0f54996",
  "3528033e990ed70ed7a603c067f1e6506270b",
  "35282727de7b34aaeb0bd760627a24105c354",
  "35283fee3a22c0cc40c560e33e4eb16aecdbe",
];
