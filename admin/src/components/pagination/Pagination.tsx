import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { PaginationProps } from "../../types/contentType";

const Pagination = ({
  currentPage,
  // apiData,
  // itemsPerPage,
  handleClick,
  tabletotalPages,
  totalItems,
}: PaginationProps) => {
  const totalPages = tabletotalPages;
  // const totalPages = Math.ceil(apiData?.length / itemsPerPage);

  const firstPage = currentPage === 1 ? 1 : currentPage - 1;
  const secondPage = currentPage === 1 ? 2 : currentPage;
  const thirdPage = currentPage === 1 ? 3 : currentPage + 1;

  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div className="flex justify-start w-[90%]">
        <p className="text-sm font-medium text-gray-700">
          <span>Total Item: </span>
          <span>{totalItems > 9 ? totalItems : `0${totalItems}`}</span>
        </p>
      </div>

      <div className="flex justify-start w-full">
        {currentPage > 2 && (
          <button
            className="px-2 py-1 mx-1 bg-gray-200 rounded text-black/60"
            onClick={() => handleClick(currentPage - 1)}
          >
            <IoChevronBack />
          </button>
        )}

        {totalPages >= 1 && (
          <>
            <button
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === firstPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black/60"
              }`}
              onClick={() => handleClick(firstPage)}
            >
              {firstPage}
            </button>
            {totalPages >= 2 && (
              <button
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === secondPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black/60"
                }`}
                onClick={() => handleClick(secondPage)}
              >
                {secondPage}
              </button>
            )}
            {totalPages >= 3 && thirdPage <= totalPages && (
              <button
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === thirdPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black/60"
                }`}
                onClick={() => handleClick(thirdPage)}
              >
                {thirdPage}
              </button>
            )}
          </>
        )}
        {currentPage < totalPages - 1 && (
          <button
            className="px-2 py-1 mx-1 bg-gray-200 rounded text-black/60"
            onClick={() => handleClick(currentPage + 1)}
          >
            <IoChevronForward />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
