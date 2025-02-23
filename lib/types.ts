export interface PreviewItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  type: "Primary Category" | "Secondary Category";
  link: string;
}
