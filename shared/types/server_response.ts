export type Res<T> = {
  data: T;
  error: boolean;
  message: string;
  statusCode: number;
};

export type Paginated<T> = T & {
  page: number;
  pageSize: number;
  totalPages: number;
  totalResult: number;
};
