type RequestParams = {
  page: string;
  limit: string;
};

type ResponseParams = [pageNumber: number, limitNumber: number];

export function getPaginationParams(query: RequestParams): ResponseParams {
  const { page, limit } = query;

  const pageNumber =
    typeof page === 'string' && parseInt(page, 10) ? parseInt(page, 10) : 1;

  const limitNumber =
    typeof limit === 'string' && parseInt(limit, 10) ? parseInt(limit, 10) : 10;

  return [pageNumber, limitNumber];
}
