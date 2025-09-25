import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.html',
  styleUrls: ['./pagination.css'],
})
export class Pagination implements OnInit, OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;

  @Output() pageChanged = new EventEmitter<number>();

  totalPages: number = 1;
  visiblePages: number[] = [];
  showStartEllipsis: boolean = false;
  showEndEllipsis: boolean = false;
  startItem: number = 0;
  endItem: number = 0;
  maxVisiblePages: number = 3;

  ngOnInit() {
    this.calculatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['itemsPerPage'] || changes['currentPage']) {
      this.calculatePagination();
    }
  }

  private calculatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;

    this.calculateVisiblePages();

    this.calculateItemInfo();
  }

  private calculateVisiblePages() {
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = this.currentPage - half;
    let end = this.currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(this.maxVisiblePages, this.totalPages);
    }

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, this.totalPages - this.maxVisiblePages + 1);
    }

    if (start <= 2) {
      start = 1;
      this.showStartEllipsis = false;
    } else {
      start = Math.max(3, start);
      this.showStartEllipsis = true;
    }

    if (end >= this.totalPages - 1) {
      end = this.totalPages;
      this.showEndEllipsis = false;
    } else {
      end = Math.min(this.totalPages - 2, end);
      this.showEndEllipsis = true;
    }

    if (start === 1) start = 2;
    if (end === this.totalPages) end = this.totalPages - 1;

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      if (i > 0 && i <= this.totalPages) {
        this.visiblePages.push(i);
      }
    }

    if (this.visiblePages.length === 0) {
      this.showStartEllipsis = false;
      this.showEndEllipsis = false;
    }
  }

  private calculateItemInfo() {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);

    if (this.totalItems === 0) {
      this.startItem = 0;
      this.endItem = 0;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.calculatePagination();
      this.pageChanged.emit(page);
    }
  }
}
