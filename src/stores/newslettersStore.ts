import { create } from "zustand";
import type { NewsletterFormData } from "./newsLetterStore";

export type SavedNewsletter = {
  id: string;
  title: string;
  html: string;
  data: NewsletterFormData;
  templateId: string;
  createdAt: number;
};

type NewslettersStore = {
  newsletters: SavedNewsletter[];
  addNewsletter: (newsletter: Omit<SavedNewsletter, "id" | "createdAt">) => string;
  removeNewsletter: (id: string) => void;
};

export const useNewslettersStore = create<NewslettersStore>((set) => ({
  newsletters: [],

  addNewsletter: (newsletter) => {
    const id = crypto.randomUUID();
    set((state) => ({
      newsletters: [
        {
          ...newsletter,
          id,
          createdAt: Date.now(),
        },
        ...state.newsletters,
      ],
    }));
    return id;
  },

  removeNewsletter: (id) =>
    set((state) => ({
      newsletters: state.newsletters.filter((item) => item.id !== id),
    })),
}));
