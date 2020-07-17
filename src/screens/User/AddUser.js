import React from "react";
import { Modal, Input, Button } from 'antd';
import axiosService from '../../utils/axiosService';

class AddUser extends React.Component {
   constructor(props) {
       super(props)

       this.state = {
        users: [],
        count: 2,
        visible: false,
        inputValue: {
            firstName: '',
            surName: '',
            birthYear: '',
            birthPlace: '',
            department: '',
            role: '',
            email: '',
        },
        search: '',
        statusEdit: true,
        userEditObject: {},
        loading: false
       };
    //    this.onChange = this.onChange.bind(this);
   }

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
            roles: this.state.inputValue.role,
            email: this.state.inputValue.email,
            password: this.state.inputValue.password,
        };

        console.log(newData)
        axiosService.post(`https://gams-temp.herokuapp.com/api/users/`, newData)
            .then(res => {
                const newArray = [...this.state.users];
                newArray.unshift(res.user)
                console.log(newArray) //unshift to display item has been created upto the top
                this.setState({
                    users: newArray, //update new array for users list
                    visible: false, // close modal after click "OK" button
                    visible2: false,
                    count: count + 1,
                    inputValue: {
                        firstName: '',
                        surName: '',
                        birthYear: '',
                        birthPlace: '',
                        department: '',
                        role: '',
                        email: '',
                        password:'',
                    },
                })
            }
            )
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                
                <Modal
                    title="Create A User"
                    visible={this.state.visible}
                    onOk={this.handleAdd}
                    onCancel={this.handleCancel}
                >
                    
                    FirstName: <Input  value={this.state.inputValue.firstName}
                                      onChange={(e) => this.onChange("firstName", e)}/>
                    SurName: <Input value={this.state.inputValue.surName}
                                    onChange={(e) => this.onChange("surName", e)}/>
                    Email: <Input value={this.state.inputValue.email} onChange={(e) => this.onChange("email", e)}/>
                    BirthYear: <Input value={this.state.inputValue.birthYear}
                                      onChange={(e) => this.onChange("birthYear", e)}/>
                    City: <Input value={this.state.inputValue.birthPlace}
                                 onChange={(e) => this.onChange("birthPlace", e)}/>
                    Roles: <Input value={this.state.inputValue.role} onChange={(e) => this.onChange("role", e)}/>
                    DU: <Input value={this.state.inputValue.department}
                               onChange={(e) => this.onChange("department", e)}/>
                    Your Password: <Input value={this.state.inputValue.password}
                    onChange={(e) => this.onChange("password", e)}/>
                    
                </Modal>
            </div>
        );
    }
}

export default AddUser;