import React from 'react';
import TableComponent from '../Table/Table';
import { useFetchSubCategoryData } from '@/services/subCategory/fetchSubCategoryData';

const SubCategoryList = () => {
  const { loading, subcategories, error } = useFetchSubCategoryData();
console.log(subcategories);
  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Wrap categories in a function returning a Promise
  const fetchData = async () => {
    return Promise.resolve(subcategories); // Return the categories as a resolved promise
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'categoryId' },
    // Add more columns as needed
  ];

  return (
    <div className="App">
      <TableComponent fetchData={fetchData} columns={columns} itemsPerPage={20} />
    </div>
  );
};

export default SubCategoryList;