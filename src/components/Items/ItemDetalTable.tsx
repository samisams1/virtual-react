// ItemDetailTable.tsx

import React, { useState, useEffect } from 'react';
import './TableStyles.css'; // Ensure your CSS file contains relevant styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CartItem } from '@/redux/types'; // Adjust the import path as necessary
import { addToCart } from '@/redux/actions/cartAction';

export interface TableItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description?: string; // Optional
    [key: string]: any; // Allow indexing with a string key
}

interface Column {
    header: string;
    accessor: keyof TableItem; // Ensure accessor corresponds to TableItem keys
}

interface TableComponentProps {
    fetchData: () => Promise<TableItem[]>;
    columns: Column[];
    itemsPerPage?: number;
}

const ItemDetailTable: React.FC<TableComponentProps> = ({
    fetchData,
    columns,
    itemsPerPage = 5,
}) => {
    const [data, setData] = useState<TableItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortedData, setSortedData] = useState<TableItem[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof TableItem; direction: 'asc' | 'desc' } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData();
                setData(result);
                setSortedData(result);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [fetchData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const requestSort = (key: keyof TableItem) => {
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

    const handleAddToCart = (item: CartItem) => {
      console.log('Adding to cart:', item);
      dispatch(addToCart(item));
      navigate("/cart");
  };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th className="name-column" onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                            Name
                            {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : null}
                        </th>
                        {columns.slice(1).map((column) => (
                            <th key={column.accessor} className="other-column" onClick={() => requestSort(column.accessor)} style={{ cursor: 'pointer' }}>
                                {column.header}
                                {sortConfig?.key === column.accessor ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : null}
                            </th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td className="name-column">
                                <Link to={`/item/${item.id}`} style={{ textDecoration: 'underline', color: 'brown' }}>
                                    {item.name}
                                </Link>
                                <div style={{ fontSize: "12px" }}>{item.description}</div>
                            </td>
                            {columns.slice(1).map(column => (
                                <td key={column.accessor} className="other-column">{item[column.accessor]}</td>
                            ))}
                            <td>
                                <button 
                                    className="cart-button" 
                                    style={{ backgroundColor: 'green', border: 'none', color: 'white', borderRadius: '4px', padding: '8px' }}
                                    onClick={() => handleAddToCart(item)} 
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} />
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

export default ItemDetailTable;