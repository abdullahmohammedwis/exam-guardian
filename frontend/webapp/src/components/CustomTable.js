import React, { useState, useEffect } from "react";
import { Table, Pagination, InputGroup, FormControl, Button, Container } from "react-bootstrap";

const DynamicTable = ({ headers, tableData, isLoading }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    setCurrentPageData(tableData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, tableData]);

  const maxPage = Math.ceil(tableData.length / itemsPerPage);

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(maxPage);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  const handleInputPageChange = (event) => {
    const pageNumber = parseInt(event.target.value);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= maxPage) {
      setCurrentPage(pageNumber);
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB"); // Use 'en-US' for US date format
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Table responsive variant="light" className="custom-striped-table">
        <thead style={{ position: "sticky", top: 0 }} className="table-head custom-table-head">
          <tr>
            {headers.map((header) => (
              <th key={header.key} className={header.className}>
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="custom-striped-table">
          {isLoading ? (
            <tr className="text-center">
              <td colSpan={headers.length}>
                <div className="spinner-border text-primary mx-auto my-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : currentPageData.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>No data found</td>
            </tr>
          ) : (
            currentPageData.map((row) => (
              <tr key={row[headers[0].key]}>
                {headers.map((header) => {
                  // If the key of the column is 'examDate', format the date
                  let cellValue = header.key === "examDate" ? formatDate(row[header.key]) : row[header.key];

                  return header.key === "logo" ? (
                    <td key={header.key} className="text-center">
                      <img className="company-logo" src={row[header.key]} alt="logo" />
                    </td>
                  ) : (
                    <td key={header.key}>{cellValue}</td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Pagination className="mt-3 justify-content-center">
        <Pagination.First onClick={handleFirstPage} />
        <Pagination.Prev onClick={handlePrevPage} />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={handleNextPage} />
        <Pagination.Last onClick={handleLastPage} />
        <Pagination.Item>
          <InputGroup size="sm">
            <FormControl
              type="number"
              min="1"
              max={maxPage}
              value={currentPage}
              onChange={handleInputPageChange}
              className="page-input"
            />
          </InputGroup>
        </Pagination.Item>
      </Pagination>
    </Container>
  );
};

export default DynamicTable;
