export type Document = {
    id: string;
    title: string;
    author: string;
    type: 'pdf' | 'markdown' | 'word' | string;
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