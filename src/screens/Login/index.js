import React, { useState, useEffect } from 'react';
import "./index.scss";
import { Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Logo from '../../asset/images/logo_cmc.png';
import Loading from '../../components/Loading';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginScreens() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) history.push("/users");
    }, [])

    // handle login 
    const handleSignIn = (values) => {
        setLoading(true);
        Axios.post("https://gams-temp.herokuapp.com/api/auth/signin", values)
            .then(res => {
                if (res.data) {
                    Cookies.set("token", res.data.token, { expires: 1 });
                    Cookies.set("department", res.data.department, { expires: 1 });
                    Cookies.set("fullName", res.data.fullName, { expires: 1 });
                    Cookies.set("id", res.data.id, { expires: 1 });
                    history.push("/users");
                }
            })
            .catch((err) => setError("Incorrect login data"))
            .finally(() => {
                setLoading(false);
            })
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
                <p className="error">{error}</p>
                <Form
                    onFinish={handleSignIn}
                >
                    <Form.Item
                        className="form__input"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            className="input"
                            name="email"
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
