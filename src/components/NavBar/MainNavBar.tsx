import React, { useState } from "react";
import logo from "@/assets/logo.jpg";
import avatar from "@/assets/avatar.png";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFetchCategoryData } from "@/services/category/fetchCategoryData";

interface Subcategory {
  title: string; // Adjust if necessary
}

interface Category {
  title: string; // Adjust if necessary
  subcategories: Subcategory[]; // Ensure this matches your data structure
}

const MainNavBar: React.FC = () => {
  const { loading, categories, error } = useFetchCategoryData();
  const [hidden, setHidden] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle loading and error states at the end
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="h-16 fixed top-0 z-10 w-full md:hidden flex justify-between items-center bg-white px-4 border-b border-[#EAECF0]">
        <img
          src={logo}
          alt="topnav_logo"
          className="w-36 object-scale-down object-center"
        />
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          className="group"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setHidden((val) => !val)}
        >
          <rect y="0.5" width="40" height="40" rx="8" fill="white" />
          <path
            className="group-hover:stroke-color6 stroke-color4"
            d="M11 20.5H25M11 14.5H29M11 26.5H29"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <aside
        className={`fixed z-20 ${
          hidden ? "-translate-x-full" : "translate-x-0"
        } md:flex flex-col top-16 md:top-0 bottom-0 left-0 w-full md:w-[17.5rem] bg-[rgba(0,0,0,0.5)] md:bg-transparent transition-transform`}
      >
        <nav className="h-full w-[17.5rem] bg-white overflow-y-auto">
          <div className="my-8 mx-6 mb-8">
            <div className="items-center hidden md:flex">
              <img src={logo} alt="sidebar_logo" />
            </div>
            <div className="flex items-center mt-4">
              <Link to="/login" className="text-blue-600 underline">Login</Link>
              <div className="mx-2 w-1 h-6 bg-brown-600" /> {/* Brown space */}
              <Link to="/register" className="text-blue-600 underline">Register</Link>
            </div>
            <Input placeholder="Search" parentclassname="mt-6" />
            <ul className="mt-8 min-h-[50px] border-red-600">
              {categories.map((category: any) => (
                <li key={category.name}>
                  <div onClick={() => toggleCategory(category.name)} className="flex items-center justify-between cursor-pointer">
                    <span className="ml-2">
                      {openCategories[category.name] ? (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4 6l4 4 4-4H4z" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M6 4l4 4-4 4V4z" />
                        </svg>
                      )}
                    </span>
                    <Button title={category.name} />
                  </div>
                  {openCategories[category.name] && category.subcategories.length > 0 && (
                    <ul className="ml-4">
                      {category.subcategories.map((subCat: any) => (
                        <li key={subCat.name}>
                          <Button
                            title={subCat.name}
                            onClick={() =>
                              navigate(`/${category.name.replace(/ +/g, '-').toLowerCase()}/${subCat.name.replace(/ +/g, '-').toLowerCase()}`)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <hr className="mt-6 bg-[#EAECF0]" />
            <div className="flex mt-6">
              <div className="min-h-[50px] flex items-center">
                <img
                  src={avatar}
                  className="w-10 object-contain object-center"
                  alt="avatar"
                />
                <div className="flex flex-col text-left ml-3">
                  <span className="text-sm leading-5 font-bold text-color3">Samson Mamushet</span>
                  <span className="text-sm leading-5 text-color4 font-normal">forsamisas</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default MainNavBar;