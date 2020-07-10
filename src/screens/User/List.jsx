import React, {useContext, useState, useEffect, useRef} from 'react';
import {CloseOutlined, SearchOutlined} from '@ant-design/icons';
import {Table, Input, Modal, Button, Popconfirm, Form, Tooltip} from 'antd';
import axios from "axios";

const EditableContext = React.createContext();

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

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
            handleSave({...record, ...values});
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
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
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
                title: 'First Name',
                dataIndex: 'firstName',
                width: 70,
                editable: true,
                sorter: (a, b) => a.firstName < b.firstName,
                sortDirections: ['descend'],
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'Last Name',
                dataIndex: 'surName',
                width: 70,
                editable: true,
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: 70,
                editable: true,
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'BirthYear',
                dataIndex: 'birthYear',
                width: 70,
                editable: true,
                sorter: (a, b) => a.birthYear < b.birthYear,
                sortDirections: ['descend'],
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'City',
                dataIndex: 'birthPlace',
                width: 70,
                editable: true,
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'Role',
                dataIndex: 'role',
                width: 30,
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'DU',
                dataIndex: 'department',
                width: 50,
                sorter: (a, b) => a.department < b.department,
                sortDirections: ['descend'],
                render: text => <span style={{fontWeight: 600, cursor: 'pointer'}}>{text}</span>,
            },
            {
                title: 'Action',
                width: 25,
                dataIndex: 'action',
                key: 'action',
                fixed: 'left',
                render: (text, record) =>
                    this.state.users.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,

            },
        ];
        this.state = {
            users: [],
            count: 2,
            visible: false,
            inputValue: ''
        };
    }

    componentDidMount() {
        axios.get(`https://gams-temp.herokuapp.com/api/users/`)
            .then(res => {
                const users = res.data.users;
                this.setState({users});
            })
            .catch(error => console.log(error))
    }

    handleDelete = id => {
        const users = [...this.state.users];
        axios.delete(`https://gams-temp.herokuapp.com/api/users/` + id)
            .then(res => {
                this.setState({
                    users: users.filter(user => user.id !== id),
                });
            })
            .catch(error => console.log(error))

    };

    handleAdd = () => {
        const {count, users} = this.state;
        const newData = {
            key: count,
            firstName: "Thien123ABC",
            surName: "James",
            birthYear: 1995,
            birthPlace: "SOHO",
            department: "DU1",
            role: 7,
            email: "bdthien@cmc.com.vn"
        };
        axios.post(`https://gams-temp.herokuapp.com/api/users/`, newData)
            .then(res => {
                    this.setState({
                        users: [...this.state.users, res.data.user],
                        count: count + 1,
                    })
                }
            )
    };


    handleSave = row => {
        const newData = [...this.state.users];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        this.setState({
            users: newData,
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {users} = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
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
        return (
            <div>
                <div className='ul-header'>
                    <h1 className='ul-header-title pr-10p'>CMC GLOBAL EMPLOYEES</h1>
                    <Input
                        style={{maxWidth: '350px', float: 'right', marginRight: '20px'}}
                        placeholder="Search"
                        prefix={<SearchOutlined className="site-form-item-icon"/>}
                        suffix={
                            <Tooltip title="Close">
                                <CloseOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                            </Tooltip>
                        }
                    />

                </div>
                <Button
                    onClick={this.showModal}
                    type="primary"
                    style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginLeft: '20px'
                    }}
                >
                    Add a row
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    FirstName: <Input/>
                    SurName: <Input/>
                    Email: <Input/>
                    BirthYear: <Input/>
                    City: <Input/>
                    Role: <Input/>
                    DU: <Input/>

                </Modal>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={this.state.users}
                    columns={columns}
                />
            </div>
        );
    }
}

export default UserList;