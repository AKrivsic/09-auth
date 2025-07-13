import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ onPageChange, totalPages, currentPage}: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      breakLabel="..."
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
