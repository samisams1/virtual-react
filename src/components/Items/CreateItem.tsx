import React, { useEffect, useState } from 'react';
import { Subcategory } from '@/redux/types'; // Adjust this import based on your structure
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchSubcategories } from '@/redux/actions';
import { createItem } from '@/redux/actions/itemActions';
import { RootState } from '@/redux/reducers/rootReducer';

interface CreateItemProps {
  onClose: () => void;
  setMessage: (message: string) => void;
  setMessageType: (type: 'success' | 'error') => void;
  onError?: (errorMessage: string) => void; // Add this line
}
const CreateItem: React.FC<CreateItemProps> = ({ onClose, setMessage, setMessageType, onError }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [subcategoryId, setSubcategoryId] = useState<number | null>(null);
  const [price, setPrice] = useState<number | string>(''); // Allow initial empty string for controlled input
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const subCategories = useSelector((state: RootState) => state.subCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || subcategoryId === null || price === '' || !imageFile || !zipFile) {
      setError('All fields are required');
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('subcategoryId', String(subcategoryId));
    formData.append('price', String(Number(price)));
    formData.append('imageurl', imageFile);
    formData.append('zipFile', zipFile);

    try {
      await dispatch(createItem(formData));
      setMessage('Item created successfully!');
      setMessageType('success');
      onClose();
    } catch (error) {
      const errorMessage = 'Failed to create item. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
      if (onError) onError(errorMessage); // Call onError if provided
    }

    // Reset form fields
    setName('');
    setSubcategoryId(null);
    setPrice('');
    setImageFile(null);
    setZipFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Item Name</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Subcategory</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={subcategoryId || ''}
          onChange={(e) => setSubcategoryId(Number(e.target.value))}
          required
        >
          <option value="" disabled>Select a subcategory</option>
          {subCategories.subcategories.map((subcategory: Subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || '')}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Item Image</label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Zip File</label>
        <input
          type="file"
          accept=".zip"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          onChange={(e) => setZipFile(e.target.files?.[0] || null)}
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
  );
};

export default CreateItem;