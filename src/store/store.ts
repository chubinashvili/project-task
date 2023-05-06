import { create } from "zustand";

type Address = {
  street: string;
  city: string;
};

export type TableData = {
  id: number | string;
  name: string;
  email: string;
  gender: "female" | "male";
  address: Address;
  phone: number;
};

interface MyStoreState {
  tableData: TableData[];
}

interface MyStoreActions {
  setTableData: (newTableData: TableData[]) => void;
}

interface MyStore extends MyStoreState, MyStoreActions {}

export const useStore = create<MyStore>((set): MyStoreState & MyStoreActions => ({
  tableData: [],
  setTableData: (data: TableData[]): void =>
    set(
      (state: MyStoreState): MyStoreState => ({
        ...state,
        tableData: data,
      })
    ),
}));

