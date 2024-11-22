import React, { useState, useEffect } from 'react';
import CategoryList from '@/components/Category/CategoryList';
import PageHeader from '@/components/Header/PageHeader';
import NavBar from '@/components/NavBar/NavBar';
import { FaPlus } from 'react-icons/fa';
import Modal from '@/components/Modal/Modal';
import CreateCategory from '@/components/Category/CreateCategory';
import CategoryIcon from '@/assets/category.svg'; // Adjust the path based on where you save the SVG

const CategoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage(''); // Clear message when modal closes
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Clear message after 3 seconds

      // Cleanup timeout on unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <PageHeader
          title="Category"
          icon={<img src={CategoryIcon} alt="Icon" className="h-6 w-6" />}
          buttonLabel="Add Item"
          buttonIcon={<FaPlus />}
          onButtonClick={handleAddClick}
        />
        {message}
        {message && (
          <div className={`mb-4 p-2 rounded ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        <CategoryList />
      </div>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Category Item">
        <CreateCategory 
          onClose={handleCloseModal} 
          setMessage={setMessage} 
          setMessageType={setMessageType} 
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;