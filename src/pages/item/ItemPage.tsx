import React, { useState } from 'react';
import PageHeader from '@/components/Header/PageHeader';
import NavBar from '@/components/NavBar/NavBar';
import { FaPlus } from 'react-icons/fa';
import ItemList from '@/components/Items/ItemList';
import Modal from '@/components/Modal/Modal';
import CreateItem from '@/components/Items/CreateItem';
import Message from '@/components/Message/Message';
import ItemIcon from '@/assets/item.svg'; // Adjust the path based on where you save the SVG

const ItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'loading'>('success');

  const handleAddClick = () => {
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleItemCreationError = (errorMessage: string) => {
    setMessage(errorMessage);
    setMessageType('error');
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return (
    <div>
      <NavBar />
      <Message message={message} type={messageType} onClose={closeMessage} />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <section className="px-4 md:px-8">
          <PageHeader
            title="Items"
            icon={<img src={ItemIcon} alt="Items Icon" className="h-6 w-6" />} // Use the imported SVG
            buttonLabel="Add Item"
            buttonIcon={<FaPlus />}
            onButtonClick={handleAddClick}
          />
          <ItemList />
        </section>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Item">
        <CreateItem 
          onClose={handleCloseModal} 
          setMessage={setMessage} 
          setMessageType={setMessageType} 
          onError={handleItemCreationError} 
        />
      </Modal>
    </div>
  );
};

export default ItemPage;