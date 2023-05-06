import { Outlet } from "react-router-dom";

// components
import Header from "../Header/Header";

const SharedLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className='main'>
        <Outlet />
      </div>
    </>
  );
};
export default SharedLayout;
