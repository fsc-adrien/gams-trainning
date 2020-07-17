import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Col, Row, Button } from 'antd';
import Cookies from 'js-cookie';
import Logo from '../../asset/images/logo.png';
import './index.scss';

export default function Header() {
    const history = useHistory();

    const handleLogout = () => {
        Cookies.remove("token");
        history.push("/");
    }

    return (
        <Row>
            <nav className="header">
                <Col span={3}>
                    <div className="logo">
                        <img
                            src={Logo}
                            alt="logo"
                            className="header__logo"
                        />
                    </div>
                </Col>
                <Col span={10}>
                    <ul className="header__list">
                        <li>
                            <NavLink to="/users" className="header__item" activeClassName="header__item-active">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/assets" className="header__item" activeClassName="header__item-active">Assets</NavLink>
                        </li>
                    </ul>
                </Col>
                <Col span={11}>
                    <div className="header__logout">
                        <Button onClick={handleLogout} className="btnLogout">Logout</Button>
                    </div>
                </Col>
            </nav>
        </Row>
    )
}
