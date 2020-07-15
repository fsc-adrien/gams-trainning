import React, { useState, useEffect } from 'react';
import "./index.scss";
import { Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Logo from '../../asset/images/logo_cmc.png';
import Loading from '../../components/Loading';
import service from '../../utils/axiosService';

export default function LoginScreens() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const timer = null;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        }
    }, [])

    useEffect(() => {
        service.get("https://gams-temp.herokuapp.com/api/users/").then(res => setUsers(res.users));
    }, [users])

    // handle login 
    const handleSignIn = (values) => {
        console.log(values)
        // fake loading
        setLoading(true);
        timer = setTimeout(() => {
            setLoading(false);
        }, 4000);
    }
    return (
        <div className="login">
            {loading && <Loading />}
            <div className="loginWrapper">
                <img
                    src={Logo}
                    alt="Logo"
                    className="logo"
                />
                <p className="title">Global Asset Management System</p>
                <p>{users.length}</p>
                <Form
                    onFinish={handleSignIn}
                >
                    <Form.Item
                        className="form__input"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            className="input"
                            name="username"
                            prefix={<UserOutlined className="input__prefix" />}
                        />
                    </Form.Item>
                    <Form.Item
                        className="form__input"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            className="input"
                            name="password"
                            type="password"
                            prefix={<LockOutlined className="input__prefix" />}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        className="signInBtn"
                        htmlType="submit"
                    >
                        Sign In
                    </Button>
                </Form>
            </div>
        </div>
    )
}
