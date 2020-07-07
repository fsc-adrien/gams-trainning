import React from 'react';
import {CloseOutlined, SearchOutlined, PlusSquareFilled, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Table, Input, Tooltip} from 'antd';
import './List.scss'
import axios from 'axios';
import {connect, Provider} from 'react-redux'
import {addUser, deleteUser, editUser} from "../../components/Action/action";

const columns = [
    {
        title: 'Action',
        width: 100,
        dataIndex: 'action',
        key: 'action',
        fixed: 'left',
        render: () => <div><EditOutlined/> <DeleteOutlined className='pl-2'/></div>,
    },
    {
        title: 'Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Surname',
        dataIndex: 'surname',
        key: '1',
        width: 150,
    },
    {
        title: 'Birth Year',
        dataIndex: 'birth_year',
        key: '2',
        width: 150,
    },
    {
        title: 'Birth Place',
        dataIndex: 'place',
        key: '2',
        width: 150,
    },
];

const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        name: `Edrward ${i + 1}`,
        surname: 'Snowden',
        birth_year: '1995',
        place: `London Park no. ${20 - i}`,
    });
}

class UserList extends React.Component {

    componentDidMount() {
        axios.get(`https://5efc5010cf235d0016ad747a.mockapi.io/api/v1/user`)
            .then(res => {
                const users = res.data;
                this.setState({users});
            })
    }

    render() {
        return (
            <div>
                <div className='ul-header'>
                    <h1 className='ul-header-title pr-10p'>Users</h1>
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined className="site-form-item-icon"/>}
                        suffix={
                            <Tooltip title="Close">
                                <CloseOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                            </Tooltip>
                        }
                    />
                    <PlusSquareFilled className='pl-2p' style={{fontSize: '24px'}}/>

                </div>
                <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        listUser: state.users
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