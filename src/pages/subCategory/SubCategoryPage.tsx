import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/Header/PageHeader';
import Modal from '@/components/Modal/Modal';
import NavBar from '@/components/NavBar/NavBar';
import SubCategoryList from '@/components/SubCategory/SubCategoryList';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createSubcategory } from '@/redux/actions/subCategoryActions'; // Import your action
import { AppDispatch, RootState } from '@/redux/store'; // Adjust the import according to your store setup
import { fetchCategories } from '@/redux/actions/categoryActions'; // Ensure correct import

// Define a type for your category
interface Category {
  id: number;
  name: string;
}

const SubCategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subCategoryName, setSubCategoryName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Get categories from Redux store
  const categories = useSelector((state: RootState) => state.category); // Adjust the selector based on your state structure

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubCategoryName('');
    setSelectedCategoryId(null);
    setError(null); // Reset error when closing modal
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subCategoryName && selectedCategoryId) {
      try {
        await dispatch(createSubcategory({ name: subCategoryName, categoryId: selectedCategoryId }));
        handleCloseModal();
      } catch (err) {
        setError('Failed to add subcategory. Please try again.');
      }
    } else {
      setError('Subcategory name and category are required.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <PageHeader
          title="Sub Category"
          icon={<img src="path/to/icon.png" alt="Icon" className="h-6 w-6" />}
          buttonLabel="Add New"
          buttonIcon={<FaPlus />}
          onButtonClick={handleAddClick}
        />
        <SubCategoryList />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add Category Item">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Sub Category Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter item name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Category</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={selectedCategoryId || ''}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.categories.map((category: Category) => ( // Use the defined type
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
      </Modal>
    </div>
  );
};

export default SubCategoryPage;