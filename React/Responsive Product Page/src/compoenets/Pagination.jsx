import React from "react";

const Pagination = ({
    currentPage,
    totalPages,
    handleNext,
    handlePrevious,
    hanndlePageChange,
}) => {
    return (
        <div className="pagination-container">
            <button
                disabled={currentPage === 0}
                onClick={() => handlePrevious()}
            >
                ⏮️
            </button>
            {[...Array(totalPages).keys()].map((item) => (
                <button
                    className={"btn " + (item === currentPage ? "active" : "")}
                    key={item}
                    onClick={() => hanndlePageChange(item)}
                >
                    {item}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages - 1}
                onClick={() => handleNext()}
            >
                ⏭️
            </button>
        </div>
    );
};

export default Pagination;
