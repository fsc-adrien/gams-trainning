import React from "react";
import { Modal, Input, Button, Select } from "antd";
import axiosService from "../../utils/axiosService";

const OPTIONS = [
  {
    name: "Employee",
    value: 1,
  },
  {
    name: "DU Lead",
    value: 2,
  },
  {
    name: "Group Lead",
    value: 3,
  },
  {
    name: "Accouting",
    value: 4,
  },
  {
    name: "Admin",
    value: 5,
  },
  {
    name: "SEPG",
    value: 6,
  },
  {
    name: "BOD",
    value: 7,
  },
];

class AddUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      count: 2,
      visible: false,
      inputValue: {
        firstName: "",
        surName: "",
        birthYear: "",
        birthPlace: "",
        department: "",
        roles: [],
        email: "",
      },
      search: "",
      userEditObject: {},
      loading: false,
      selectedItems: [],
    };
    //    this.onChange = this.onChange.bind(this);
  }
  handleChange = (selectedItems) => {
    this.setState({
      inputValue: {
        ...this.state.inputValue,
        roles: selectedItems,
      },
    });
    console.log(selectedItems);
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //handle function add a row of user to list
  handleAdd = () => {
    const { count, users } = this.state;
    const newData = {
      key: count,
      firstName: this.state.inputValue.firstName,
      surName: this.state.inputValue.surName,
      birthYear: this.state.inputValue.birthYear,
      birthPlace: this.state.inputValue.birthPlace,
      department: this.state.inputValue.department,
      roles: this.state.inputValue.roles,
      email: this.state.inputValue.email,
      password: this.state.inputValue.password,
    };
    console.log(newData.roles);
    console.log(newData);
    axiosService
      .post(`https://gams-temp.herokuapp.com/api/users/`, newData)
      .then((res) => {
        // const newArray = [...this.state.users];
        // newArray.unshift(res.user)
        // console.log(newArray) //unshift to display item has been created upto the top
        this.props.updateStateUser(res.user);
        this.setState({
          visible: false, // close modal after click "OK" button
          visible2: false,
          count: count + 1,
          inputValue: {
            firstName: "",
            surName: "",
            birthYear: "",
            birthPlace: "",
            department: "",
            roles: "",
            email: "",
            password: "",
          },
        });
      });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  isChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      inputValue: {
        ...this.state.inputValue,
        [name]: name === "roles" ? [value] : value,
      },
    });
    // console.log(value);
  };

  render() {
    const selectedItems = this.state.inputValue.roles;
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create A New User
        </Button>

        <Modal
          title="Create A New User"
          visible={this.state.visible}
          onOk={this.handleAdd}
          onCancel={this.handleCancel}
        >
          FirstName:{" "}
          <Input
            name="firstName"
            value={this.state.inputValue.firstName}
            onChange={(event) => this.isChange(event)}
          />
          SurName:{" "}
          <Input
            name="surName"
            value={this.state.inputValue.surName}
            onChange={(event) => this.isChange(event)}
          />
          Email:{" "}
          <Input
            name="email"
            value={this.state.inputValue.email}
            onChange={(event) => this.isChange(event)}
          />
          Your Password:{" "}
          <Input
            name="password"
            value={this.state.inputValue.password}
            onChange={(event) => this.isChange(event)}
          />
          BirthYear:{" "}
          <Input
            name="birthYear"
            value={this.state.inputValue.birthYear}
            onChange={(event) => this.isChange(event)}
          />
          City:{" "}
          <Input
            name="birthPlace"
            value={this.state.inputValue.birthPlace}
            onChange={(event) => this.isChange(event)}
          />
          Roles:
          <Select
            name="roles"
            mode="multiple"
            placeholder="Select Rows"
            value={this.selectedItems}
            onChange={this.handleChange}
            style={{ width: "100%" }}
          >
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          DU:{" "}
          <Input
            name="department"
            value={this.state.inputValue.department}
            onChange={(event) => this.isChange(event)}
          />
        </Modal>
      </div>
    );
  }
}

export default AddUser;
