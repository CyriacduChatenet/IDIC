// 🔹 CREATE
export interface StrapiApiCreateResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

// 🔹 FIND ALL
export interface StrapiApiFindAllResponse<T> {
  data: T[]; // Liste d'éléments
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// 🔹 FIND ONE
export interface StrapiApiFindOneResponse<T> {
  data: T;
}

// 🔹 UPDATE
export interface StrapiApiUpdateResponse<T> {
  data: T;
  meta?: Record<string, any>;
}

// 🔹 DELETE
export interface StrapiApiDeleteResponse<T> {
  data: T;
}
