import React, { useState, useEffect } from 'react';
import './TableStyles.css'; // Ensure your CSS file contains relevant styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'; // Import the download icon

// Define the interface for the table item
export interface TableItem {
  [key: string]: any; // Allow any properties for flexibility
}

// Define the interface for column definitions
interface Column {
  header: string; // Column header text
  accessor: string; // Key to access the data
}

// Define the props interface for the TableComponent
interface TableComponentProps {
  fetchData: () => Promise<TableItem[]>; // Function to fetch data
  columns: Column[]; // Column definitions
  itemsPerPage?: number; // Optional prop for items per page
  onDownload: (zipFilePath: string) => Promise<void>; // Prop for download function
}

const LibraryDetailTable: React.FC<TableComponentProps> = ({
  fetchData,
  columns,
  itemsPerPage = 5,
  onDownload,  // Receive the download function as a prop
}) => {
  const [data, setData] = useState<TableItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState<TableItem[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Fetch data from API or mock service
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
      setSortedData(result); // Initialize sorted data
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

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                <td key={column.accessor}>{item[column.accessor]}</td>
              ))}
              <td>
                <button className="action-button" onClick={() => onDownload(item.zipFile)}>
                  <FontAwesomeIcon icon={faDownload} /> Download
                </button>
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

export default LibraryDetailTable;