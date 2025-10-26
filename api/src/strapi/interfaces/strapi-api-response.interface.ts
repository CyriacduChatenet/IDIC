export interface StrapiApiCreateResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

export interface StrapiApiFindAllResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiApiFindOneResponse<T> {
  data: T;
}

export interface StrapiApiUpdateResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

export interface StrapiApiDeleteResponse<T> {
  data: T;
}
