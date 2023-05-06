import { useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// api
import axios, { AxiosResponse } from "axios";

// store
import useStore, { TableData } from "./store/store";

// components
import Dashboard from "./components/Dashboard/Dashboard";
import Table from "./components/Table/Table";
import InfoChart from "./components/InfoChart/InfoChart";
import SharedLayout from "./components/SharedLayout/SharedLayout";

function App(): JSX.Element {
  const { setTableData } = useStore();

  const getUsersData = useCallback(async (): Promise<void> => {
    try {
      const { data }: AxiosResponse<{ data: TableData[] }> = await axios.get(
        "http://localhost:3001/api/get-users"
      );
      setTableData(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getUsersData();
  }, []);

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
