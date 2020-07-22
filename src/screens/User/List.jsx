import React, { useContext, useState, useEffect, useRef } from 'react';
import "./List.scss";
import { CloseOutlined, SearchOutlined, DeleteOutlined, EditOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Table, Input, Modal, Button, Popconfirm, Form, Tooltip, InputNumber, Space, notification } from 'antd';
import axios from "axios";
import SearchComponent from "./Search";
import axiosService from '../../utils/axiosService';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Loading from '../../components/Loading';
import AddUser from './AddUser';
import Draft from './Draft';

const EditableContext = React.createContext();



const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    
      

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Firstname',
                dataIndex: 'firstName',
                width: 70,
                editable: true,
                sorter: (a, b) => a.firstName < b.firstName,
                sortDirections: ['descend'],
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            {
                title: 'Surname',
                dataIndex: 'surName',
                width: 70,
                editable: true,
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: 70,
                editable: true,
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            {
                title: 'Birthyear',
                dataIndex: 'birthYear',
                width: 70,
                editable: true,
                sorter: (a, b) => a.birthYear < b.birthYear,
                sortDirections: ['descend'],
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            {
                title: 'City',
                dataIndex: 'birthPlace',
                width: 70,
                editable: true,
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            // {
            //     title: 'Role',
            //     dataIndex: 'role',
            //     width: 30,
            //     render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            // },
            {
                title: 'DU',
                dataIndex: 'department',
                width: 50,
                sorter: (a, b) => a.department < b.department,
                sortDirections: ['descend'],
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            {
                title: 'Action',
                width: 25,
                dataIndex: 'action',
                key: 'action',
                fixed: 'left',
                render: (text, record) =>
                    this.state.users.length >= 1 ? (
                          <Space size="middle">
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <DeleteOutlined />
                            </Popconfirm>
                            <EditOutlined onClick={() => this.handleEdit(record)} />
                        </Space>
                    ) : null,                    
            },
        ];
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

    }

    
    componentDidMount() {
        this.setState({
            loading:true
        })
        axiosService.get(`https://gams-temp.herokuapp.com/api/users/`)
        .then(res => {
            const { users } = res;
            this.setState({ 
                users : users,        
            });
            
        }).finally(() => {
            this.setState({
                loading: false
            });
        })

    }

    handleEdit = (record) => {
        this.setState({ userEditObject: record });
        this.showModal('edit')
        // this.handleUpdate(record);
    }


    isShowEditForm = () => {
        if (this.state.statusEdit === true) {
            this.showModal()
        }
    }

    handleSearch = () => {
        console.log("searching..")
        axiosService.get(`https://gams-temp.herokuapp.com/api/users/?search=${this.state.search}`)
            .then(res => {
                this.setState({
                    users: res.users,
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    //handle close button in search bar
    handleClose = () => {
        this.setState({
            search: '', //reset state of search
        }
        )
    }

    //get value after input in search bar
    onSearchChange = e => {
        this.setState({
            search: e.target.value
        })
    }
    

    //handle delete function
    handleDelete = id => {
        const users = [...this.state.users];
        axiosService.delete(`https://gams-temp.herokuapp.com/api/users/` + id)
            .then(res => {
                this.setState({
                    users: users.filter(user => user.id !== id),
                });
            })
            .catch(error => console.log(error))

    };

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            userEditObject: {
                ...this.state.userEditObject,
                [name]: name === 'roles' ? [value] : value,
            }
        });
    }

    showNotice = () =>{
        this.openNotification();
      }
    openNotification = () => {
        const key = `open${Date.now()}`;
        
        notification.open({
          message: 'Update User Successfully',
          description:
            'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
          key,
          statusNotice : false,
        });
      };
    

    handleUpdate = (info) => {
        delete info.birthDay;
        const config = { headers: {'Content-Type': 'application/json' }};
        console.log(info);
        axiosService.put(`https://gams-temp.herokuapp.com/api/users/`, JSON.stringify(info))
            .then(res => {
                this.showNotice()
                const newArray = [...this.state.users].filter(user => user.id !== res.userId);
                newArray.unshift(info)
                console.log(res);
                    console.log('Update Success');
                    this.setState({
                        users: newArray, //update new array for users list
                        visible: false, // close modal after click "OK" button
                        visible2: false,
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
            })
            .catch(error => {
                console.log('error :>> ', error);
                console.log('Update Failed');
            });
    };
    //get value after input in modal
    onChange(field, e) {
        this.setState({
            inputValue: {
                ...this.state.inputValue,
                [field]: field === 'role' ? [e.target.value] : e.target.value,
            }
        })
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    // show modal to fill in info to add user to list
    showModal = (type) => {
        if(type === 'add') {
            this.setState({
                visible: true,
            });
        } else {
            this.setState({
                visible2: true,
            });
        }
    };



    //set visible or not after click OK in modal
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
            visible2: false,
        });
    };
    
    handleUpdateUser = (user) => {
        const newArray = [...this.state.users];
        newArray.unshift(user)
                // console.log(newArray)
        this.setState({
            users: newArray
        })
    }

    render() {
        const { users, loading } = this.state;
        const {  } = this.props;
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <div className='ul-header'>
                    <h1 className='ul-header-title pr-10p'>CMC GLOBAL EMPLOYEES</h1>
                    <SearchComponent
                        onSearchChange={this.onSearchChange}
                        search={this.state.search}
                        handleSearch={this.handleSearch}
                        handleClose={this.handleClose}
                    />
                </div>
       
                <Modal
                    title="Edit User"
                    visible={this.state.visible2}
                    onOk={() => this.handleUpdate(this.state.userEditObject)}
                    // onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >

                    Firstname: <Input value={this.state.userEditObject.firstName} name="firstName" onChange={(event) => this.isChange(event)} />
                    Surname: <Input value={this.state.userEditObject.surName} name="surName" onChange={(event) => this.isChange(event)} />
                    Email: <Input value={this.state.userEditObject.email} name="email" onChange={(event) => this.isChange(event)} />
                    Password: <Input value={this.state.inputValue.password} name="password"  onChange={(event) => this.isChange(event)}/>
                    Birthyear: <Input value={this.state.userEditObject.birthYear} name="birthYear" onChange={(event) => this.isChange(event)} />
                    City: <Input value={this.state.userEditObject.birthPlace} name="birthPlace" onChange={(event) => this.isChange(event)} />
                    Role: <Input value={this.state.userEditObject.role} name="roles" onChange={(event) => this.isChange(event)} />
                    DU: <Input name="department" value={this.state.userEditObject.department}onChange={(event) => this.isChange(event)} />

                </Modal>
                
                <AddUser updateStateUser={this.handleUpdateUser}/>
                <Table 
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={this.state.users}
                    columns={columns}
                    loading={loading}
                />
                <Draft/>
                {/* <TableDataRow/> */}
            </div>
        );
    }
}

export default UserList;