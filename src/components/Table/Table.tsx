import React, { useEffect, useState } from "react";

// store
import useStore, { TableData } from "../../store/store";

// api
import axios from "axios";

// components
import { Table as TableUI, Form, Button, Modal, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";

// styles
import styles from "./Table.module.css";

const { Option } = Select;

// types
interface Address {
  street: string;
  city: string;
}

export type Values = {
  name: string;
  email: string;
  gender: "female" | "male";
  phone: number;
  street: string;
  city: string;
};

interface Props {}

const Table: React.FC<Props> = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [id, setId] = useState<string | number>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [clickedRow, setClickedRow] = useState<TableData | null>(null);
  const [clickCount, setClickCount] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  const { tableData, setTableData } = useStore();
  const [form] = Form.useForm();

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleRowClick = (record: TableData) => {
    if (clickCount === 1 && clickedRow?.id !== record?.id) {
      setClickedRow(null);
      setClickCount(0);
      return;
    }

    const newCount = clickCount + 1;

    setClickedRow(record);
    setClickCount(newCount);

    if (newCount % 2 === 0) {
      setEdit(true);
      setId(record?.id);
      form.setFieldsValue({
        name: record?.name,
        email: record?.email,
        gender: record?.gender,
        street: record?.address?.street,
        city: record?.address?.city,
        phone: record?.phone,
      });

      toggleModal();
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleDelete = async (record: TableData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/remove-user",
        {
          id: record?.id,
        }
      );
      setTableData(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  function calculateIndex(page: number, pageSize: number): number {
    return (page - 1) * pageSize;
  }

  const columns: ColumnsType<TableData> = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) =>
        calculateIndex(currentPage, pageSize) + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) =>
        `${record.address.city}, ${record.address.street}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: () => (
        <Button type='primary' onClick={handleAdd}>
          Add
        </Button>
      ),
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => handleDelete(record)}>
          {loading ? "Loading..." : "Delete"}
        </Button>
      ),
    },
  ];

  const handleFormSubmit = async (values: Values) => {
    const { name, email, gender, phone, street, city } = values;

    const address: Address = {
      street,
      city,
    };

    try {
      if (edit) {
        const { data } = await axios.patch<{ data: TableData[] }>(
          `http://localhost:3001/api/update-user`,
          {
            id,
            name,
            email,
            gender,
            address,
            phone,
          }
        );
        setTableData(data.data);
      } else {
        const { data } = await axios.post<{ data: TableData[] }>(
          `http://localhost:3001/api/add-user`,
          {
            name,
            email,
            gender,
            address,
            phone,
          }
        );
        setTableData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = (values: Values) => {
    handleFormSubmit(values);
    form.resetFields();
    setSuccess(`User ${edit ? "Updated" : "Added"} successfully`);
    setId("");
    setClickedRow(null);
    setClickCount(0);

    setTimeout(() => {
      setSuccess("");
      toggleModal();
    }, 2000);
  };

  const handleCancel = () => {
    form.resetFields();
    setId("");
    toggleModal();
    setClickedRow(null);
    setClickCount(0);
  };

  const handleAdd = () => {
    setEdit(false);
    toggleModal();
    form.resetFields();
    setId("");
  };

  return (
    <section className={`${styles.main} ${animate ? styles.animate : ""}`}>
      <header className={styles.header}>
        <h1 className={`font-51`}>Users</h1>
      </header>
      <TableUI
        dataSource={tableData}
        columns={columns}
        rowKey={"id"}
        scroll={{ x: true }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        className={styles.table}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: tableData.length,
          onChange: (page, pageSize) => setCurrentPage(page),
          onShowSizeChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
      <Modal
        title={edit ? "Edit User" : "Add User"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            htmlType='submit'
            form='user-form'>
            Submit
          </Button>,
        ]}
        centered>
        <Form form={form} onFinish={onFinish} id='user-form'>
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              {
                pattern: /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/,
                message: "Please enter a valid text (e.g. Barney Stinson)",
              },
            ]}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: "Please enter your email" },
              {
                type: "email",
                message: "This must be a valid email address",
              },
            ]}>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
            <Select placeholder='Select gender'>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='street'
            label='Street'
            rules={[
              {
                required: true,
                message: "Please enter street you live at",
              },
              {
                pattern: /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/,
                message: "Please enter a valid text (e.g. Chavchavadze street)",
              },
            ]}>
            <Input placeholder='Street' />
          </Form.Item>
          <Form.Item
            name='city'
            label='City'
            rules={[
              {
                required: true,
                message: "Please enter the city you live in",
              },
              {
                pattern: /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/,
                message: "Please enter a valid text (e.g. Tbilisi)",
              },
            ]}>
            <Input placeholder='City' />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Phone'
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
              {
                pattern: /^[a-zA-Z]+(\s?[a-zA-Z]+)*$/,
                message:
                  "Please enter a valid phone number (e.g. +995595999999)",
              },
            ]}>
            <Input placeholder='Phone' />
          </Form.Item>
        </Form>
        {success && <p>{success}</p>}
      </Modal>
    </section>
  );
};

export default Table;
