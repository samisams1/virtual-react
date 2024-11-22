import PageHeader from '@/components/Header/PageHeader';
import ItemDetalTable from '@/components/Items/ItemDetalTable';
import MainNavBar from '@/components/NavBar/MainNavBar';
import TableComponent from '@/components/Table/Table';
import { useFetchProductsBySubcategoryId } from '@/services/item/fetchItemBySubCategoryId';
import React from 'react';

import ItemIcon from '@/assets/item.svg'; // Adjust the path based on where you save the SVG

export interface ItemPageProps {
  categoryId: number; // Assuming the category ID is a string
  subCategoryId:number;
}

const ItemDetailPage: React.FC<ItemPageProps> = ({ categoryId,subCategoryId }) => {
  const { loading, items, error } = useFetchProductsBySubcategoryId(subCategoryId);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // Wrap categories in a function returning a Promise
  const fetchData = async () => {
    return Promise.resolve(items); // Return the categories as a resolved promise
  };

  const columns = [
    { header: 'Image', accessor: 'imageurl', isImage: true },
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Language', accessor: 'language' },
    { header: 'Price,USD', accessor: 'price' }
  ];
  return (
    <div>
    <MainNavBar />
    <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
      <section className="px-4 md:px-8">
        <PageHeader
          title="Nile epcatalogs"
          icon={<img src="path/to/icon.png" alt="Icon" className="h-6 w-6" />}
        />
 <ItemDetalTable fetchData={fetchData} columns={columns} itemsPerPage={5} />
  

      </section>
    </div>
  
  </div>
  )
}

export default ItemDetailPage
