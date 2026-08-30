export const CANDY_FAMILY_PAGE_SIZE = 9;

export function paginateCandyFamilies(
  families = [],
  requestedPage = 1,
  pageSize = CANDY_FAMILY_PAGE_SIZE,
) {
  const items = Array.isArray(families) ? families : [];
  const safePageSize = Math.max(1, Math.floor(Number(pageSize) || 1));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(
    totalPages,
    Math.max(1, Math.floor(Number(requestedPage) || 1)),
  );
  const startIndex = (currentPage - 1) * safePageSize;

  return {
    items: items.slice(startIndex, startIndex + safePageSize),
    currentPage,
    pageSize: safePageSize,
    totalItems,
    totalPages,
    rangeStart: totalItems ? startIndex + 1 : 0,
    rangeEnd: Math.min(startIndex + safePageSize, totalItems),
  };
}
