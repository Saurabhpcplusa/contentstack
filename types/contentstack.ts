// types/contentstack.ts
export interface PageEntry {
    uid: string;
    title: string;
    url_slug?: string;
    content: string;
    seo?: {
      meta_title?: string;
      meta_description?: string;
    };
    [key: string]: any; // For other custom fields
  }