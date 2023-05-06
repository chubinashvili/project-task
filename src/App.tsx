import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Dashboard from "./components/Dashboard/Dashboard";
import Table from "./components/Table/Table";
import InfoChart from "./components/InfoChart/InfoChart";
import SharedLayout from "./components/SharedLayout/SharedLayout";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='users' element={<Table />} />
          <Route path='info-chart' element={<InfoChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
