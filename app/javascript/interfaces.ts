export interface User {
  about?: string;
  comments_count: number
  created_at: string;
  id: number;
  karma: number;
  stories_count: number;
  updated_at: string;
  username: string;
}

export interface Story {
  comments_count: number;
  created_at: string;
  id: number;
  score: number;
  text?: string;
  title: string;
  updated_at: string;
  url: string;
  user_id: number;
}
