import PageHeader from '@/components/Header/PageHeader';
import MainNavBar from '@/components/NavBar/MainNavBar';
import { useFetchItemById } from '@/services/item/fechItemById';
import React from 'react';
import { useParams } from 'react-router-dom';
import ItemIcon from '@/assets/item.svg'; // Adjust the path based on where you save the SVG

const SingleItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, currentItem, error } = useFetchItemById(Number(id)); // Fetch item using the id from params

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <MainNavBar />
      <div className="mt-16 md:mt-0 flex md:ml-[17.5rem] py-8">
        {/* Left Section - 60% */}
        <div className="w-full md:w-3/5 px-4 md:px-8">
          <PageHeader
            title="Nile EpCatalogs"
            icon={<img src="path/to/icon.png" alt="Icon" className="h-6 w-6" />}
          />
          <div className="min-h-[200px]">
            <h2 className="text-lg font-bold">{currentItem?.name || 'Item Name'}</h2>
            <p className="mt-2">{currentItem?.description || 'No description available.'}</p>
          </div>
        </div>

        {/* Right Section - 40% */}
        <div className="w-full md:w-2/5 px-4">
          <img
            src={currentItem?.imageurl || 'path/to/default-image.png'}
            alt={currentItem?.name || 'Item Image'}
            className="w-full h-auto mb-4" // Adjust image styling as needed
          />
          <div>
            <div className="font-bold">Type of Catalog:</div>
            <div>{currentItem?.type || 'Repair Manual'}</div>
          </div>
          <div>
            <div className="font-bold">Make:</div>
            <div>{currentItem?.make || 'Tulsa'}</div>
          </div>
          <div>
            <div className="font-bold">Region:</div>
            <div>{currentItem?.region || 'WorldWide'}</div>
          </div>
          <div>
            <div className="font-bold">Inclusive Languages:</div>
            <div>{currentItem?.language || 'English'}</div>
          </div>
          <div>
            <div className="font-bold">Amount of Disks:</div>
            <div>{currentItem?.disks || '1 CD, PDF, 16 pages'}</div>
          </div>
          <div>
            <div className="font-bold">Availability:</div>
            <div>{currentItem?.availability || 'Instant Download'}</div>
          </div>
          <div>
            <div className="font-bold">OS:</div>
            <div>{currentItem?.os || 'Windows XP 32 bit, Windows 7 (various)'}</div>
          </div>
          <div>
            <div className="font-bold">Price, USD:</div>
            <div>{currentItem?.price || '39'}</div>
          </div>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleItemPage;