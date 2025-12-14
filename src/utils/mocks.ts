export const mockArticles = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  body: `Content for article ${i + 1}`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
}));
