import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon

interface ModalProps {
  isOpen: boolean;                  // Whether the modal is open
  onClose: () => void;              // Function to close the modal
  title?: string;                   // Optional title for the modal
  children: React.ReactNode;        // Content to display in the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;