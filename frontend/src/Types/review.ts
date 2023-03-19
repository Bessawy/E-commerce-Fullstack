export interface reviewType {
  userName?: string;
  productid: number;
  comment: string;
  rate: number;
}

export interface getReviewsType {
  offset: number;
  limit: number;
  productid: number;
}
