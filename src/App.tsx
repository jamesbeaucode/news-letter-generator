import { useState } from "react";
import type { Id } from "../convex/_generated/dataModel";
import { AppSidebar, type AppPage } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_EMAIL_TEMPLATE_ID } from "@/lib/email-templates";
import {
  CreateNewsletterPage,
  resetCreateNewsletterForm,
} from "@/pages/create-newsletter-page";
import { NewsletterPage } from "@/pages/newsletter-page";
import { TemplatesPage } from "@/pages/templates-page";

type Route =
  | { page: "newsletter" }
  | { page: "templates" }
  | {
      page: "create-newsletter";
      templateId: string;
      newsletterId?: Id<"newsletters">;
    };

function getPageTitle(route: Route) {
  if (route.page === "create-newsletter" && route.newsletterId) {
    return "Edit Newsletter";
  }

  if (route.page === "create-newsletter") {
    return "Create Newsletter";
  }

  if (route.page === "templates") {
    return "Templates";
  }

  return "Newsletter";
}

function App() {
  const [route, setRoute] = useState<Route>({ page: "newsletter" });

  const openCreateNewsletter = (
    templateId: string = DEFAULT_EMAIL_TEMPLATE_ID,
  ) => {
    resetCreateNewsletterForm();
    setRoute({ page: "create-newsletter", templateId });
  };

  const openEditNewsletter = (newsletterId: Id<"newsletters">) => {
    resetCreateNewsletterForm();
    setRoute({
      page: "create-newsletter",
      templateId: DEFAULT_EMAIL_TEMPLATE_ID,
      newsletterId,
    });
  };

  const sidebarPage: AppPage =
    route.page === "create-newsletter" ? "newsletter" : route.page;

  return (
    <SidebarProvider>
      <AppSidebar
        currentPage={sidebarPage}
        onNavigate={(page) => setRoute({ page })}
        onQuickCreate={() => openCreateNewsletter()}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-sm font-medium">{getPageTitle(route)}</h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {route.page === "newsletter" && (
            <NewsletterPage
              onCreateNewsletter={() => openCreateNewsletter()}
              onEditNewsletter={openEditNewsletter}
            />
          )}
          {route.page === "templates" && (
            <TemplatesPage onCreateNewsletter={openCreateNewsletter} />
          )}
          {route.page === "create-newsletter" && (
            <CreateNewsletterPage
              templateId={route.templateId}
              newsletterId={route.newsletterId}
              onSaved={() => setRoute({ page: "newsletter" })}
              onCancel={() =>
                setRoute({
                  page: route.newsletterId ? "newsletter" : "templates",
                })
              }
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
