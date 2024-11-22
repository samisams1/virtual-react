import React from 'react';
import TableComponent from '../Table/Table';
import { useFetchItemData } from '@/services/item/fetchItemData';

const ItemList = () => {
  const { loading,items , error } = useFetchItemData();

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Wrap categories in a function returning a Promise
  const fetchData = async () => {
    return Promise.resolve(items); // Return the categories as a resolved promise
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Image', accessor: 'imageurl', isImage: true },
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Language', accessor: 'language' },
    { header: 'sub Category', accessor: 'subcategoryId' },
    { header: 'Price', accessor: 'price' },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="App">
      <TableComponent fetchData={fetchData} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default ItemList