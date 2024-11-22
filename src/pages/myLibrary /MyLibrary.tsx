import PageHeader from '@/components/Header/PageHeader';
import ItemIcon from '@/assets/item.svg'; // Adjust the path based on where you save the SVG
import { useFetchLibraryData } from '@/services/library/fetchLibrary';
import LibraryDetailTable from '@/components/Library/LibraryDetailTable';
import NavBar from '@/components/NavBar/NavBar';

const MyLibrary = () => {
  const { loading, items, error } = useFetchLibraryData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Wrap categories in a function returning a Promise
  const fetchData = async () => {
    return Promise.resolve(items); // Return the categories as a resolved promise
  };

  const handleDownload = async (zipFilePath:string) => {
    try {
      const response = await fetch(zipFilePath); // Fetch the ZIP file from the server
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob(); // Convert to Blob
      const url = URL.createObjectURL(blob); // Create a URL for the Blob
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'library_files.zip'); // Specify the filename
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const columns = [
    { header: 'Img', accessor: 'imagePath' },
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Language', accessor: 'language' },
    { header: 'Price, USD', accessor: 'price' },
    { header: 'Status', accessor: 'status' },
    { header: 'File', accessor: 'zipFile' }, // This will hold the path to the ZIP file
  ];

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <section className="px-4 md:px-8">
          <PageHeader
            title="My Library"
            icon={<img src={ItemIcon} alt="Icon" className="h-6 w-6" />}
          />
          <LibraryDetailTable 
            fetchData={fetchData} 
            columns={columns} 
            itemsPerPage={20} 
            onDownload={handleDownload} // Pass the download function to the table
          />
        </section>
      </div>
    </div>
  );
};

export default MyLibrary;