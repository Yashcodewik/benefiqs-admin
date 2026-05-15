export type Article = {
  id: number;
  title: string;
  category: string;
  date: string;
  views: number;
  content: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Top 5 Deals for Premium Members",
    category: "Deals",
    date: "May 12, 2026",
    views: 1842,
    content: "Premium members can now access curated partner offers across travel, dining, and wellness.",
  },
  {
    id: 2,
    title: "How to Build Better Benefit Campaigns",
    category: "Guides",
    date: "May 10, 2026",
    views: 328,
    content: "Clear content, timely offers, and audience-specific segmentation improve campaign performance.",
  },
  {
    id: 3,
    title: "New Partner Rewards Launch",
    category: "Partners",
    date: "May 8, 2026",
    views: 614,
    content: "A new partner rewards collection is ready for editorial review before publishing.",
  },
  {
    id: 4,
    title: "Member Benefits Update",
    category: "Benefits",
    date: "May 4, 2026",
    views: 2205,
    content: "Latest benefit updates for active members and subscription plan holders.",
  },
];

export function getArticleById(id: string | number) {
  return articles.find((article) => article.id === Number(id)) ?? null;
}
