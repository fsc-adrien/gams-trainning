import React, { useState, useEffect } from "react";
import axiosService from '../../utils/axiosService';
import {
  CloseOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import {
  Table,
  Input,
  Modal,
  Button,
  Popconfirm,
  Form,
  Tooltip,
  InputNumber,
  Space,
  notification,
} from "antd";

// componentDidMount() {
//     axiosService.get(`https://gams-temp.herokuapp.com/api/users/`)
//     .then(res => {
//         const { users } = res;
//         setUsers(users = users)

//     }).finally(() => {
//         this.setState({
//             loading: false
//         });
//     })

// }

function App() {
  const [users, setUsers] = useState([]);
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
      width: 70,
      editable: true,
      sorter: (a, b) => a.firstName < b.firstName,
      sortDirections: ["descend"],
      render: (text) => (
        <span style={{ fontWeight: 600, cursor: "pointer" }}>{text}</span>
      ),
    },
    {
      title: "Surname",
      dataIndex: "surName",
      width: 70,
      editable: true,
      render: (text) => (
        <span style={{ fontWeight: 600, cursor: "pointer" }}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 70,
      editable: true,
      render: (text) => (
        <span style={{ fontWeight: 600, cursor: "pointer" }}>{text}</span>
      ),
    },
    {
      title: "Birthyear",
      dataIndex: "birthYear",
      width: 70,
      editable: true,
      sorter: (a, b) => a.birthYear < b.birthYear,
      sortDirections: ["descend"],
      render: (text) => (
        <span style={{ fontWeight: 600, cursor: "pointer" }}>{text}</span>
      ),
    },
    {
      title: "City",
      dataIndex: "birthPlace",
      width: 70,
      editable: true,
      render: (text) => (
        <span style={{ fontWeight: 600, cursor: "pointer" }}>{text}</span>
      ),
    },
    // {
    //     title: 'Role',
    //     dataIndex: 'role',
    //     width: 30,
    //     render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
    // },
    {
      title: "DU",
      dataIndex: "department",
      width: 50,
      sorter: (a, b) => a.department < b.department,
      sortDirections: ["descend"],
      render: (text) => (
        <span style={{ fontWeight: 600, cursor: "pointer" }}>{text}</span>
      ),
    },
    {
      title: "Action",
      width: 25,
      dataIndex: "action",
      key: "action",
      fixed: "left",
      render: (text, record) =>
        users.length >= 1 ? (
          <Space size="middle">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <DeleteOutlined />
            </Popconfirm>
            <EditOutlined />
          </Space>
        ) : null,
    },
  ];
  useEffect(() => {
    axiosService
      .get(`https://gams-temp.herokuapp.com/api/users/`)
      .then((res) => {
        const { users } = res;
        setUsers(users);
      })
      .finally(() => {});
  }, []);

  return (
    <div>
      <Table
        rowClassName={() => "editable-row"}
        bordered
        dataSource={users}
        columns={columns}
      />
    </div>
  );
}

export default App;
