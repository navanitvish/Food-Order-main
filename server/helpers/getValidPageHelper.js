const getValidPage = (page, totalPages) => {
  totalPages = Math.max(totalPages, 1);
  console.log(Math.max(parseInt(page), 1), page, totalPages);
  console.log(Math.min(Math.max(parseInt(page), 1), totalPages));
  return Math.min(Math.max(parseInt(page), 1), totalPages);
};

module.exports = getValidPage;
