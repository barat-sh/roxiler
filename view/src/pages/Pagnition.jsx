
const Pagination = ({ currentPage, totalPages, onPageChange, perPage }) => {

    return (
        <div className="flex items-center justify-evenly w-full mt-4">
            <div className="border border-gray-600 p-2 rounded-lg">
                Page.No:
                {currentPage}
            </div>
            <div>
                <button className={`${currentPage <= 1 ? 'bg-neutral-700' : "bg-stone-950"} p-2 m-2`} disabled={currentPage <= 1} onClick={() => {
                    onPageChange(currentPage - 1);
                }}>Previous
                </button>
                --
                <button className={`${currentPage === totalPages ? 'bg-neutral-700' : "bg-stone-950"} p-2 m-2`}
                        disabled={currentPage === totalPages} onClick={() => [
                    onPageChange(currentPage + 1),
                ]}>Next</button>
            </div>
            <div className="border border-gray-600 p-2 rounded-lg">
                Per.Page:
                {perPage}
            </div>
        </div>
    );
}

export default Pagination;