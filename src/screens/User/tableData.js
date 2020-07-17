import React, { Component, useContext, useState, useEffect, useRef } from 'react';
import { CloseOutlined, SearchOutlined, DeleteOutlined, EditOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Table, Input, Modal, Button, Popconfirm, Form, Tooltip } from 'antd';
import axiosService from '../../utils/axiosService';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
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

class tableData extends Component {
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
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
            {
                title: 'Last Name',
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
                title: 'BirthYear',
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
            {
                title: 'Role',
                dataIndex: 'role',
                width: 30,
                render: text => <span style={{ fontWeight: 600, cursor: 'pointer' }}>{text}</span>,
            },
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
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <DeleteOutlined />
                        </Popconfirm>

                    ) : null,

            },
            {
                title: 'Action',
                width: 25,
                dataIndex: 'action',
                key: 'action',
                fixed: 'left',
                render: (text, record) =>
                    this.state.users.length >= 1 ? (
                        <EditOutlined onClick={() => this.handleEdit(record)} />
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
    render() {
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

export default tableData;