import React, { useState, useEffect } from 'react';
import './TableStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faPrint } from '@fortawesome/free-solid-svg-icons';

export interface TableItem {
  [key: string]: any;
}

interface Column {
  header: string;
  accessor: string;
  isImage?: boolean;
}

interface TableComponentProps {
  fetchData: () => Promise<TableItem[]>;
  columns: Column[];
  itemsPerPage?: number;
}

const TableComponent: React.FC<TableComponentProps> = ({
  fetchData,
  columns,
  itemsPerPage = 5,
}) => {
  const [data, setData] = useState<TableItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState<TableItem[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      const updatedResult = result.map(item => ({
        ...item,
        imageurl: `http://localhost:4000/${item.imageurl}`,// Construct the correct image URL
      }));
      setData(updatedResult);
      setSortedData(updatedResult);
    };
    getData();
  }, [fetchData]);

  // Handle pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Search filtering
  useEffect(() => {
    setSortedData(
      data.filter(item =>
        columns.some(column =>
          item[column.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [data, searchTerm, columns]);

  // Sorting function
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  };

  // CSV Export function
  const exportToCSV = () => {
    const csvData = [
      columns.map(column => column.header).join(','), // Header row
      ...sortedData.map(item => columns.map(column => item[column.accessor]).join(',')), // Data rows
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print function
  const printTable = () => {
    const printWindow = window.open('', '', 'height=400,width=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print</title>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<h1>Table Data</h1>');
      printWindow.document.write(document.querySelector('.table-container')!.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={exportToCSV} title="Export to CSV">
          <FontAwesomeIcon icon={faFileCsv} /> Export CSV
        </button>
        <button onClick={printTable} title="Print">
          <FontAwesomeIcon icon={faPrint} /> Print
        </button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} onClick={() => requestSort(column.accessor)} style={{ cursor: 'pointer' }}>
                {column.header}
                {sortConfig?.key === column.accessor ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : null}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor}>
                  {column.isImage ? (
                    <img src={item[column.accessor]} alt={"img"}  className="item-image" />
                  ) : (
                    item[column.accessor]
                  )}
                </td>
              ))}
              <td>
                <button className="action-button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;