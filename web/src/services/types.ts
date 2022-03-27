interface Post {
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
  results: Post[];
}
