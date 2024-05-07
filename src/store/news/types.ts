export interface iNewsItem {
    id: string;
    title: string;
    content: string;
    link: string;
    keywords: string;
    creator: string;
    video_url: string;
    description: string;
    pubDate: string;
    image_url: string;
    source_url: string;
    language: string;
    country: string[];
    category: string[];
  }

  export interface iNewsState {
    news: iNewsItem[];
    loading: boolean;
    error: string | null;
    pagination: any;
    selectedNewsItem?: iNewsItem;
    }
