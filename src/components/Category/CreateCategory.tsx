import { AppDispatch } from '@/redux/store';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '@/redux/actions';

interface CreateCategoryProps {
  onClose: () => void;
  setMessage: (message: string) => void;
  setMessageType: (type: 'success' | 'error') => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ onClose, setMessage, setMessageType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [categoryName, setCategoryName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName) {
      try {
        await dispatch(createCategory({ name: categoryName, subcategories: [] }));
        setMessage('Category created successfully!');
        setMessageType('success');
        onClose();
      } catch (error) {
        setMessage('Failed to create category. Please try again.');
        setMessageType('error');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter item name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes 
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;