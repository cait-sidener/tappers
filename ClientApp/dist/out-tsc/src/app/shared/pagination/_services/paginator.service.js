import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PaginatorService = class PaginatorService {
    paginate(totalItems, currentPage, pageSize, maxPages) {
        let totalPages = Math.ceil(totalItems / pageSize), startPage, endPage;
        if (currentPage < 1)
            currentPage = 1;
        else if (currentPage > totalPages)
            currentPage = totalPages;
        if (totalPages <= maxPages) {
            startPage = 1;
            endPage = totalPages;
        }
        else {
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2), maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPages;
            }
            else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
        let startIndex = (currentPage - 1) * pageSize, endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1), pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
};
PaginatorService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    })
], PaginatorService);
export { PaginatorService };
//# sourceMappingURL=paginator.service.js.map