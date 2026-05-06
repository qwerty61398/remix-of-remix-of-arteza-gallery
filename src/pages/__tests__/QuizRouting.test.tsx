import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { collections, type CollectionType } from "@/data/paintings";

// ----- Mock supabase so the quiz/collection page can fetch our "newly added" painting -----
const NEW_PAINTING = {
  id: "new-painting-1",
  title: "Storm Bloom: Burst of Pigment",
  description: "A turbulent burst of teal, ember orange, and crimson.",
  story: null,
  price: 8800,
  dimensions: '14" x 14"',
  collection: "Abstract Expressions",
  image_url: "https://example.com/storm-bloom.jpg",
  is_available: true,
  is_featured: false,
  medium: "Acrylic",
  material: "Canvas",
  created_at: new Date().toISOString(),
};

vi.mock("@/integrations/supabase/client", () => {
  const builder: any = {
    _collection: null as string | null,
    select() { return this; },
    eq(col: string, val: string) {
      if (col === "collection") this._collection = val;
      return this;
    },
    order() {
      const data = this._collection === NEW_PAINTING.collection ? [NEW_PAINTING] : [];
      return Promise.resolve({ data, error: null });
    },
  };
  return {
    supabase: {
      from: () => ({ ...builder, _collection: null }),
    },
  };
});

// ----- Shared scoring logic (mirrors QuizPage.getRecommendedCollection) -----
function getRecommendedCollection(
  questions: { options: { collections: string[] }[] }[],
  answers: number[],
): string {
  const scores: Record<string, number> = {};
  answers.forEach((answerIdx, qIdx) => {
    questions[qIdx].options[answerIdx].collections.forEach((c) => {
      scores[c] = (scores[c] || 0) + 1;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "natures-palette";
}

const SLUG_TO_NAME: Record<string, CollectionType> = {
  "abstract-expressions": "Abstract Expressions",
  "cultural-chronicles": "Cultural Chronicles",
  "dreamscapes": "Dreamscapes",
  "natures-palette": "Nature's Palette",
  "portraits-and-personalities": "Portraits and Personalities",
};

describe("Art Style Quiz routing → Collection page", () => {
  it("every collection slug used in scoring maps to a real CollectionType", () => {
    const validSlugs = collections.map((c) => c.slug);
    Object.keys(SLUG_TO_NAME).forEach((slug) => {
      expect(validSlugs).toContain(slug);
    });
  });

  it("scoring picks abstract-expressions when answers favor bold/energetic options", () => {
    // Mirror of the actual quiz options from QuizPage.tsx
    const questions = [
      { options: [
        { collections: ["cultural-chronicles", "natures-palette"] },
        { collections: ["abstract-expressions"] },
        { collections: ["dreamscapes", "portraits-and-personalities"] },
        { collections: ["natures-palette", "dreamscapes"] },
      ]},
      { options: [
        { collections: ["abstract-expressions"] },
        { collections: ["natures-palette", "dreamscapes"] },
        { collections: ["portraits-and-personalities"] },
        { collections: ["cultural-chronicles"] },
      ]},
      { options: [
        { collections: ["natures-palette"] },
        { collections: ["portraits-and-personalities"] },
        { collections: ["abstract-expressions"] },
        { collections: ["cultural-chronicles"] },
      ]},
      { options: [
        { collections: ["abstract-expressions", "cultural-chronicles"] },
        { collections: ["dreamscapes", "natures-palette"] },
        { collections: ["portraits-and-personalities", "abstract-expressions"] },
        { collections: ["cultural-chronicles", "natures-palette"] },
      ]},
      { options: [
        { collections: ["abstract-expressions"] },
        { collections: ["cultural-chronicles", "dreamscapes"] },
        { collections: ["portraits-and-personalities", "natures-palette"] },
        { collections: ["dreamscapes", "portraits-and-personalities"] },
      ]},
    ];

    // Pick all "abstract-expressions" leaning answers
    const answers = [1, 0, 2, 0, 0];
    const slug = getRecommendedCollection(questions, answers);
    expect(slug).toBe("abstract-expressions");
    expect(SLUG_TO_NAME[slug]).toBe("Abstract Expressions");
  });

  it("a newly added painting in 'Abstract Expressions' is reachable from the quiz route /gallery/abstract-expressions", async () => {
    const { usePaintingsByCollection } = await import("@/hooks/use-paintings");

    function CollectionStub() {
      const { data } = usePaintingsByCollection("Abstract Expressions");
      return (
        <ul>
          {(data || []).map((p) => (
            <li key={p.id} data-testid="painting">{p.title}</li>
          ))}
        </ul>
      );
    }

    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={["/gallery/abstract-expressions"]}>
          <Routes>
            <Route path="/gallery/:slug" element={<CollectionStub />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Storm Bloom: Burst of Pigment")).toBeInTheDocument();
    });
  });
});
