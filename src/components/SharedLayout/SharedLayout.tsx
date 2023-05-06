import { Outlet } from "react-router-dom";

// components
import { Header } from "../";

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
