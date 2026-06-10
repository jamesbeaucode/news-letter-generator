import { InfoIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNewsLetterStore } from "./stores/newsLetterStore";

type FieldProps = {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  multiline?: boolean;
};

function Field({ label, value, onChange, multiline }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {multiline ? (
        <Textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      ) : (
        <Input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

type SectionInfo = {
  description: string;
  imageUrl: string;
};

type SectionProps = {
  title: string;
  info: SectionInfo;
  children: React.ReactNode;
};

function SectionInfoTrigger({
  title,
  info,
}: {
  title: string;
  info: SectionInfo;
}) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`More info about ${title}`}
        >
          <InfoIcon className="size-4" weight="bold" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72 p-3">
        <p className="mb-2.5 text-sm leading-relaxed text-popover-foreground">
          {info.description}
        </p>
        <img
          src={info.imageUrl}
          alt={`${title} section preview`}
          className="aspect-video w-full rounded-sm object-cover"
        />
      </HoverCardContent>
    </HoverCard>
  );
}

function FormSection({ title, info, children }: SectionProps) {
  return (
    <fieldset className="mb-4 rounded-lg border border-border bg-background px-5 py-4">
      <legend className="px-1.5 text-lg font-medium text-foreground">
        <span className="inline-flex items-center gap-1.5">
          {title}
          <SectionInfoTrigger title={title} info={info} />
        </span>
      </legend>
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}

function NewsletterForm() {
  const data = useNewsLetterStore((state) => state.data);
  const updateField = useNewsLetterStore((state) => state.updateField);
  const updateNested = useNewsLetterStore((state) => state.updateNested);
  const updateBlogSub = useNewsLetterStore((state) => state.updateBlogSub);
  const updateArticle = useNewsLetterStore((state) => state.updateArticle);
  const loadSampleData = useNewsLetterStore((state) => state.loadSampleData);

  return (
    <form
      className="mx-auto max-w-2xl text-left"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormSection
        title="Hero"
        info={{
          description:
            "The hero is the top banner of the newsletter with a full-width image, headline, and subtitle.",
          imageUrl: "/images/hero.png",
        }}
      >
        <Field
          label="Hero image URL"
          value={data.heroImage}
          onChange={(value) => updateField("heroImage", value)}
        />
        <Field
          label="Hero title"
          value={data.heroTitle}
          onChange={(value) => updateField("heroTitle", value)}
        />
        <Field
          label="Hero subtitle"
          value={data.heroSubtitle}
          onChange={(value) => updateField("heroSubtitle", value)}
        />
      </FormSection>

      <FormSection
        title="Main article"
        info={{
          description:
            "The main article is the primary featured story block shown directly below the hero.",
          imageUrl: "/images/main-desc.png",
        }}
      >
        <Field
          label="Subtitle"
          value={data.mainArticle.subTitle}
          onChange={(value) => updateNested("mainArticle", "subTitle", value)}
        />
        <Field
          label="Title"
          value={data.mainArticle.title}
          onChange={(value) => updateNested("mainArticle", "title", value)}
        />
        <Field
          label="Description"
          value={data.mainArticle.description}
          onChange={(value) =>
            updateNested("mainArticle", "description", value)
          }
          multiline
        />
      </FormSection>

      <FormSection
        title="Spotlight"
        info={{
          description:
            "Spotlight highlights a single featured item with an image, title, description, and link.",
          imageUrl: "/images/spotlight.png",
        }}
      >
        <Field
          label="Image URL"
          value={data.spotlight.image}
          onChange={(value) => updateNested("spotlight", "image", value)}
        />
        <Field
          label="Title"
          value={data.spotlight.title}
          onChange={(value) => updateNested("spotlight", "title", value)}
        />
        <Field
          label="Description"
          value={data.spotlight.description}
          onChange={(value) => updateNested("spotlight", "description", value)}
          multiline
        />
        <Field
          label="Link"
          value={data.spotlight.link}
          onChange={(value) => updateNested("spotlight", "link", value)}
        />
      </FormSection>

      <FormSection
        title="Blog"
        info={{
          description:
            "The blog section features a main post with image and a smaller sub-blog teaser below it.",
          imageUrl: "/images/blog-article.png",
        }}
      >
        <Field
          label="Title"
          value={data.blog.title}
          onChange={(value) => updateNested("blog", "title", value)}
        />
        <Field
          label="Image URL"
          value={data.blog.image}
          onChange={(value) => updateNested("blog", "image", value)}
        />
        <Field
          label="Description"
          value={data.blog.description}
          onChange={(value) => updateNested("blog", "description", value)}
          multiline
        />
        <Field
          label="Link"
          value={data.blog.link}
          onChange={(value) => updateNested("blog", "link", value)}
        />
        <Field
          label="Sub-blog title"
          value={data.blog.subBlog.title}
          onChange={(value) => updateBlogSub("title", value)}
        />
        <Field
          label="Sub-blog description"
          value={data.blog.subBlog.description}
          onChange={(value) => updateBlogSub("description", value)}
          multiline
        />
      </FormSection>

      {data.articles.map((article, index) => (
        <FormSection
          key={index}
          title={`Article ${index + 1}`}
          info={{
            description:
              "Each article card appears in the articles grid with an image, category, title, description, and link.",
            imageUrl: `/images/articles.png`,
          }}
        >
          <Field
            label="Image URL"
            value={article.image}
            onChange={(value) => updateArticle(index, "image", value)}
          />
          <Field
            label="Category"
            value={article.category}
            onChange={(value) => updateArticle(index, "category", value)}
          />
          <Field
            label="Title"
            value={article.title}
            onChange={(value) => updateArticle(index, "title", value)}
          />
          <Field
            label="Description"
            value={article.description}
            onChange={(value) => updateArticle(index, "description", value)}
            multiline
          />
          <Field
            label="Link"
            value={article.link}
            onChange={(value) => updateArticle(index, "link", value)}
          />
        </FormSection>
      ))}

      <FormSection
        title="Side lines"
        info={{
          description:
            "Side lines is a compact featured block with a title and link, often used for secondary highlights.",
          imageUrl: "/images/sidelines.png",
        }}
      >
        <Field
          label="Title"
          value={data.sideLines.title}
          onChange={(value) => updateNested("sideLines", "title", value)}
        />
        <Field
          label="Link"
          value={data.sideLines.link}
          onChange={(value) => updateNested("sideLines", "link", value)}
        />
      </FormSection>

      <FormSection
        title="What's next"
        info={{
          description:
            "What's next is the closing section that teases upcoming content with a title and short description.",
          imageUrl: "/images/whats-next.png",
        }}
      >
        <Field
          label="Title"
          value={data.whatNext.title}
          onChange={(value) => updateNested("whatNext", "title", value)}
        />
        <Field
          label="Description"
          value={data.whatNext.description}
          onChange={(value) => updateNested("whatNext", "description", value)}
          multiline
        />
      </FormSection>

      <div className="mb-4 flex justify-center">
        <Button type="button" variant="outline" onClick={loadSampleData}>
          Load sample data
        </Button>
      </div>
    </form>
  );
}

export default NewsletterForm;
