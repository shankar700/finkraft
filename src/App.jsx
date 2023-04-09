import { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Button, Form, Pagination } from "antd";
import axios from "axios";

function App() {
  // const [users, SetUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [searchText, SetSearchText] = useState("");
  const [current, setCurrent] = useState(1)
  const [reset, setReset] = useState(false)
  const [pageSize , setPageSize] = useState(10)
  const [userCount , setUserCount] = useState(1)


  useEffect(() => {
    getAllUsers();
  }, [current,pageSize,reset]);

  const getAllUsers = async () => {
    const resp = await axios.get(
      `http://localhost:8080/api/indexed-users?currentIndex=${current}&pageSize=${pageSize}`
    );

    const resp1 = await axios.get(
      `http://localhost:8080/api/users`
    );

    setUserCount(resp1.data.data.length)

    // SetUsers(resp.data.data);
    setFilteredUsers(resp.data.data);
  };

  const dataSource = filteredUsers;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: `name+${Math.random()}`,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: `position+${Math.random()}`,
    },
    {
      title: "Office",
      dataIndex: "office",
      key: `office+${Math.random()}`,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: `age+${Math.random()}`,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: `start_date+${Math.random()}`,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: `salary+${Math.random()}`,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
  ];


  const onFinish = async (e) => {
    console.log(searchText);
    const users = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(users);
    setFilteredUsers(users);

    const resp = await axios.get(`http://localhost:8080/api/search?searchText=${searchText}`)
    console.log(resp.data)


  };

  const onShowSizeChange = (current, pageSize)=>{
    console.log('current: '+current + 'pageSize: '+ pageSize)
    setCurrent(current)
    setPageSize(pageSize)
  }

  const onPageChange = (page) => {
    setCurrent(page)
  }




  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Search"
          name="search"
          rules={[{ required: false, message: "Search by name" }]}
        >
          <Input
            value={searchText}
            onChange={(e) => {
              SetSearchText(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button
        danger
        onClick={() => {
          setReset(!reset);
        }}
      >
        Reset
      </Button>
      <Pagination
       showSizeChanger
       onShowSizeChange={onShowSizeChange}
       defaultCurrent={1}
       total={userCount}
       current={current}
       onChange={ onPageChange}
      />
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        // onChange={onChange}
      />
    </>
  );
}

export default App;
