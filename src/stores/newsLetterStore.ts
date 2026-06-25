import { create } from "zustand";

export const sampleData = {
  heroImage:
    "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
  heroTitle: "The Future of Coaching Is Already Here",
  heroSubtitle: "From Playbook to Performance",
  mainArticle: {
    subTitle: "Welcome to Issue 01",
    title:
      "A quick confession: the sports world doesn't need another newsletter.",
    description:
      "What it does need are more conversations about how great athletes are developed, and how coaches continue learning. That's where we'll spend our time — a view from across the sporting landscape, mixing coaching insights, industry developments, and the ideas shaping the future of athlete and coach development.",
  },
  spotlight: {
    image:
      "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
    title: "Freestyle Canada Launches on Ascend",
    description:
      "What it does need are more conversations about how great athletes are developed, and how coaches continue learning. That's where we'll spend our time — a view from across the sporting landscape, mixing coaching insights, industry developments, and the ideas shaping the future of athlete and coach development.",
    link: "https://www.google.com",
  },
  blog: {
    title: "Beyond the Basics",
    image:
      "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
    description:
      "We've officially reached the point where every team has data. The differentiator now is interpretation. The organizations gaining an edge aren't collecting more information — they're getting better at asking better questions. Here's how technology helps coaches turn information into decisions instead of dashboards",
    link: "https://www.google.com",
    subBlog: {
      title: "More from the field",
      description:
        "Three reads on building the systems behind great coaching — from leadership and culture to the day-to-day work of planning a season that survives contact with reality.",
    },
  },
  articles: [
    {
      image:
        "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
      category: "Leadership",
      title: "Creating a Winning Team Culture",
      description:
        "Real culture shows up in the details — how feedback is delivered, how standards are enforced. The strongest cultures are built through repetition, not inspiration.",
      link: "https://www.google.com",
    },
    {
      image:
        "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
      category: "Coach's Toolkit",
      title: "One Question Worth Asking",
      description:
        "If a new coach joined tomorrow, how long until they understood how you do things? The strongest organizations don't rely on tribal knowledge.",
      link: "https://www.google.com",
    },
    {
      image:
        "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
      category: "Planning",
      title: "Building Smarter Training Plans",
      description:
        "The best plans aren't rigid — they're adaptable. See how teams keep structure without sacrificing the flexibility every coach knows they need.",
      link: "https://www.google.com",
    },
  ],
  sideLines: {
    title: "The World Cup Effect Is Already Starting",
    link: "https://www.google.com",
    image:
      "https://www.image2url.com/r2/default/images/1780923775090-f602832e-acec-4145-af18-d6bcf3b44649.webp",
  },
  whatNext: {
    title:
      "How can sport organizations make coaching easier without making coaching simpler?",
    description:
      "That's the question we're focused on for the next few months. Expect more stories from coaches, more examples from organizations doing interesting work, and a few new developments we're not quite ready to talk about yet. Stay tuned.",
  },
};

export type NewsletterData = typeof sampleData;

type ArticleData = NewsletterData["articles"][number];
type NullableArticle = { [K in keyof ArticleData]: string | null };

export type NewsletterFormData = {
  heroImage: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  mainArticle: {
    subTitle: string | null;
    title: string | null;
    description: string | null;
  };
  spotlight: {
    image: string | null;
    title: string | null;
    description: string | null;
    link: string | null;
  };
  blog: {
    title: string | null;
    image: string | null;
    description: string | null;
    link: string | null;
    subBlog: {
      title: string | null;
      description: string | null;
    };
  };
  articles: NullableArticle[];
  sideLines: {
    title: string | null;
    link: string | null;
    image: string | null;
  };
  whatNext: {
    title: string | null;
    description: string | null;
  };
};

const emptyArticle = (): NullableArticle => ({
  image: null,
  category: null,
  title: null,
  description: null,
  link: null,
});

export const createEmptyData = (): NewsletterFormData => ({
  heroImage: null,
  heroTitle: null,
  heroSubtitle: null,
  mainArticle: { subTitle: null, title: null, description: null },
  spotlight: { image: null, title: null, description: null, link: null },
  blog: {
    title: null,
    image: null,
    description: null,
    link: null,
    subBlog: { title: null, description: null },
  },
  articles: [emptyArticle(), emptyArticle(), emptyArticle()],
  sideLines: { title: null, link: null, image: null },
  whatNext: { title: null, description: null },
});

export const emptyData: NewsletterFormData = createEmptyData();

const hasPopulatedValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(hasPopulatedValue);
  if (typeof value === "object") {
    return Object.values(value).some(hasPopulatedValue);
  }
  return false;
};

export const hasPopulatedData = (data: NewsletterFormData) =>
  hasPopulatedValue(data);

type NestedSectionKey =
  | "mainArticle"
  | "spotlight"
  | "blog"
  | "sideLines"
  | "whatNext";

type NewsLetterStore = {
  data: NewsletterFormData;
  updateField: <K extends keyof NewsletterFormData>(
    key: K,
    value: NewsletterFormData[K],
  ) => void;
  updateNested: <
    K extends NestedSectionKey,
    NK extends keyof NewsletterFormData[K],
  >(
    key: K,
    nestedKey: NK,
    value: NewsletterFormData[K][NK],
  ) => void;
  updateBlogSub: (
    key: keyof NewsletterFormData["blog"]["subBlog"],
    value: string,
  ) => void;
  updateArticle: (
    index: number,
    key: keyof NullableArticle,
    value: string,
  ) => void;
  loadSampleData: () => void;
  setData: (data: NewsletterFormData) => void;
  clearData: () => void;
};

export const useNewsLetterStore = create<NewsLetterStore>((set) => ({
  data: createEmptyData(),

  updateField: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),

  updateNested: (key, nestedKey, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: { ...state.data[key], [nestedKey]: value },
      },
    })),

  updateBlogSub: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        blog: {
          ...state.data.blog,
          subBlog: { ...state.data.blog.subBlog, [key]: value },
        },
      },
    })),

  updateArticle: (index, key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        articles: state.data.articles.map((article, i) =>
          i === index ? { ...article, [key]: value } : article,
        ),
      },
    })),

  loadSampleData: () => set({ data: sampleData }),

  setData: (data) => set({ data }),

  clearData: () => set({ data: createEmptyData() }),
}));

export function resetNewsletterForm() {
  useNewsLetterStore.setState({ data: createEmptyData() });
}

export function loadNewsletterForEdit(data: NewsletterFormData) {
  useNewsLetterStore.setState({ data: structuredClone(data) });
}
