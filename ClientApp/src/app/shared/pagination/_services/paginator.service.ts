import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root' //Singleton
})
export class PaginatorService {
	paginate(totalItems: number, currentPage: number, pageSize: number, maxPages: number) {
		let
			totalPages: number = Math.ceil(totalItems / pageSize),
			startPage: number,
			endPage: number;
		if (currentPage < 1) currentPage = 1;
		else if (currentPage > totalPages) currentPage = totalPages;
		if (totalPages <= maxPages) {
			startPage = 1;
			endPage = totalPages;
		} else {
			let
				maxPagesBeforeCurrentPage = Math.floor(maxPages / 2),
				maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
			if (currentPage <= maxPagesBeforeCurrentPage) {
				startPage = 1;
				endPage = maxPages;
			} else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
				startPage = totalPages - maxPages + 1;
				endPage = totalPages;
			} else {
				startPage = currentPage - maxPagesBeforeCurrentPage;
				endPage = currentPage + maxPagesAfterCurrentPage;
			}
		}
		let
			startIndex = (currentPage - 1) * pageSize,
			endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1),
			pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
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
}
