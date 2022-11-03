export interface PaginationResult {
  totalCount: number;
  perPage: number;
  currentPage: number;
  href: string;
  links: Link[];
}

export interface PaginationQueryParams {
  limit: number;
  offset: number;
}

export type Link = {
  rel: LINK_TYPE;
  href: string;
};

export enum LINK_TYPE {
  NEXT = 'next',
  PREV = 'prev',
  LAST = 'last'
}

export interface ConstructPaginationParams {
  totalCount: number;
  limit: number;
  currentPage: number;
  href: string;
}

export interface PaginationParams {
  maxRows?: number;
  totalCountQuery?: string;
  currentPage?: number;
  top?: number;
  skip?: number;
}
