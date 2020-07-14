import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd';
import Logo from '../../asset/images/logo.png';
import './index.scss';

export default function Header() {
    return (
        <Row>
            <nav className="header">
                <Col span={4}>
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
                            <NavLink to="/assets" className="header__item" activeClassName="header__item-active">Assets</NavLink>
                        </li>
                        <li>
                            <NavLink to="/users" className="header__item" activeClassName="header__item-active">Users</NavLink>
                        </li>
                    </ul>
                </Col>
            </nav>
        </Row>
    )
}
