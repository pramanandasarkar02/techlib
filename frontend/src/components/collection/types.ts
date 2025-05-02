export type Document = {
    _id: string;
    title: string;
    author: string;
    type: any;
    likes: number;
    downloads: number;
    rating: number;
    tags: string[];
    thumbnail?: string;
    lastAccessed: Date;
    description?: string;
    is_public?: boolean;
  };
  
  export type DocumentType = {
    _id: number;
    document_type: string;
  };
  
  export type TabType = 'saved' | 'liked' | 'downloaded' | 'upload';