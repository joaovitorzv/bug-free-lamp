export interface PostType {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface Posts {
  count: number;
  next: string;
  previous: string;
  results: PostType[];
}

export const POSTS_PER_PAGE = 10;
