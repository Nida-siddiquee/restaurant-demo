import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const getPageButtons = () =>
  screen.queryAllByRole('button').filter(button => /^[0-9]+$/.test(button.textContent || ''));

describe('Pagination', () => {
  it('renders nothing if only one page', () => {
    const { container } = render(
      <Pagination totalPages={1} currentPage={1} setCurrentPage={jest.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders page buttons for small number of pages', () => {
    render(<Pagination totalPages={3} currentPage={2} setCurrentPage={jest.fn()} />);
    expect(getPageButtons().length).toBe(3);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('highlights the current page', () => {
    render(<Pagination totalPages={3} currentPage={2} setCurrentPage={jest.fn()} />);
    const page2 = screen.getByText('2');
    expect(page2).toHaveStyle({ background: expect.stringMatching(/.+/) });
  });

  it('calls setCurrentPage with correct value when page clicked', () => {
    const setCurrentPage = jest.fn();
    render(<Pagination totalPages={5} currentPage={3} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByText('2'));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByText('5'));
    expect(setCurrentPage).toHaveBeenCalledWith(5);
  });

  it('disables Previous on first page', () => {
    render(<Pagination totalPages={4} currentPage={1} setCurrentPage={jest.fn()} />);
    expect(screen.getByText(/Previous/i)).toBeDisabled();
  });

  it('disables Next on last page', () => {
    render(<Pagination totalPages={4} currentPage={4} setCurrentPage={jest.fn()} />);
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  it('shows ellipsis for many pages', () => {
    render(<Pagination totalPages={10} currentPage={5} setCurrentPage={jest.fn()} />);
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls setCurrentPage with next/previous page', () => {
    const setCurrentPage = jest.fn();
    render(<Pagination totalPages={4} currentPage={2} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(setCurrentPage).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText('Next'));
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it('does not call setCurrentPage for disabled prev/next', () => {
    const setCurrentPage = jest.fn();
    render(<Pagination totalPages={4} currentPage={1} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(setCurrentPage).not.toHaveBeenCalled();
  });

  it('shows proper pagination for currentPage near the start', () => {
    render(<Pagination totalPages={10} currentPage={2} setCurrentPage={jest.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1);
  });

  it('shows proper pagination for currentPage near the end', () => {
    render(<Pagination totalPages={10} currentPage={9} setCurrentPage={jest.fn()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1);
  });
});
