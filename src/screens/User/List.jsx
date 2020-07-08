import React from 'react';
import {CloseOutlined, SearchOutlined, PlusSquareFilled} from '@ant-design/icons';
import {Table, Input, Tooltip, Popconfirm} from 'antd';
import './List.scss'
import axios from 'axios';
import {connect} from 'react-redux'
import {addUser, deleteUser, editUser} from "../../components/Action/action";

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                width: 70,
                sorter: (a, b) => a.firstName < b.firstName,
                sortDirections: ['descend'],
                render: text => <span style={{marginLeft: '20px', fontWeight: 600}}>{text}</span>,
            },
            {
                title: 'Last Name',
                dataIndex: 'surName',
                width: 70,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: 70,
            },
            {
                title: 'BirthYear',
                dataIndex: 'birthYear',
                width: 70,
                sorter: (a, b) => a.birthYear < b.birthYear,
                sortDirections: ['descend'],
                render: text => <span style={{fontWeight: 600}}>{text}</span>,
            },
            {
                title: 'City',
                dataIndex: 'birthPlace',
                width: 70,
            },
            {
                title: 'Role',
                dataIndex: 'role',
                width: 30,
            },
            {
                title: 'DU',
                dataIndex: 'department',
                width: 50,
                sorter: (a, b) => a.department < b.department,
                sortDirections: ['descend'],
                render: text => <span style={{fontWeight: 600}}>{text}</span>,
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
    }

    state = {
        users: [],
    }

    handleDelete = id => {
        const dataSource = [...this.state.users];
        this.setState({
            users: dataSource.filter(item => item.id !== id),
        });
    };

    componentDidMount() {
        axios.get(`https://gams-temp.herokuapp.com/api/users/`)
            .then(res => {
                const users = res.data.users;
                this.setState({users});
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <div className='ul-header'>
                    <h1 className='ul-header-title pr-10p' style={{marginLeft: '30px'}}>CMC GLOBAL EMPLOYEES</h1>
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined className="site-form-item-icon"/>}
                        suffix={
                            <Tooltip title="Close">
                                <CloseOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                            </Tooltip>
                        }
                    />
                    <PlusSquareFilled className='pl-2p' style={{fontSize: '24px', marginRight: '40px'}}/>

                </div>
                <Table style={{justifyContent:'center', alignItems:'center'}} columns={this.columns} dataSource={this.state.users} scroll={{x: 1300, y: 1000}}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (id) => {
            dispatch(addUser(id))
        },
        editUser: (id) => {
            dispatch(editUser(id))
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);