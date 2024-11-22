import PageHeader from '@/components/Header/PageHeader';
import NavBar from '@/components/NavBar/NavBar';
import Login from '@/components/login/Login';
import NileIcon from '@/assets/logo.jpg'; // Adjust the path based on where you save the SVG
const LoginPage = () => {
 
  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <PageHeader
          title="Login To Nile Epic"
          icon={<img src={NileIcon} alt="Icon" className="h-6 w-6" />}
        />
      </div>
   <Login/>
    </div>
  );
};

export default LoginPage;
