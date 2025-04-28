'use client';

const Pagination = ({
  totalPages,
  currentPage,
  fetchHandler,
}: {
  totalPages: number;
  currentPage: number;
  fetchHandler: ({ page }) => void;
}) => {
  // console.log(totalPages,"total page")

  return (
    <div className="flex items-end justify-end">
      <button
        onClick={() => {
          fetchHandler({ page: currentPage - 1 });
          fetchHandler;
        }}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex flex-col gap-4">
        {currentPage > 4 && (
          <div>
            <span className="bg-blue-500 rounded px-3 py-2 text-white font-semibold ">
              Current Page :{' '}
            </span>
            <button className={`ms-1 px-4 py-2 rounded bg-blue-500 text-white`}>
              {currentPage}
            </button>
          </div>
        )}

        <div className="m-0 p-0 w-fit ">
          {[...Array(totalPages >= 4 ? 4 : totalPages)].map((_, index) => {
            const page = index + 1;

            // console.log(page,"page");
            // console.log(currentPage,"current page");
            return (
              <button
                key={page}
                onClick={() => fetchHandler({ page })}
                className={`px-4 py-2 mx-[1px] rounded ${
                  currentPage == page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-400'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => fetchHandler({ page: currentPage + 1 })}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
