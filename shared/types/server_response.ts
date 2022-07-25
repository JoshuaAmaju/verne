export type Res<T> = {
  data: T;
  error: boolean;
  message: string;
  statusCode: number;
};

export type Pageable<T> = Res<
  T & {
    page: number;
    pageSize: number;
    totalPages: number;
    totalResult: number;
  }
>;
