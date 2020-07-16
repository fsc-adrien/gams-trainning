import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./index.scss";
import { Button, Row, Col } from 'antd';
import Divider from '../../../components/Seperate';
import ModalInput from '../../../components/ModalInput';

export default function TabDetail() {
    const assetState = useSelector(state => state.assetReducer);
    const [editing, setEditing] = useState(false);
    const { chosenAsset } = assetState;

    // componentDidMount
    useEffect(() => {
        // load asset
    }, [])

    const handleEditing = () => {
        setEditing(true);
    }

    const handleSubmitEdit = () => {
        console.log("Update Edit");
        setEditing(false);
    }

    return (
        <div className="detail">
            <div className="detail__section">
                <div className="detail__section__header">
                    <p className="header__title">General</p>
                    <Button onClick={editing ? handleSubmitEdit : handleEditing}>{editing ? "Update" : "Edit"}</Button>
                </div>
                <Divider />
                <Row justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Code"
                            name="code"
                            disabled={!editing}
                        />
                        <ModalInput
                            type="textarea"
                            label="Name"
                            required
                            name="name"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Type"
                            required
                            optionSelectValue={[]}
                            name="type"
                            placeholder="Select a type"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                        <ModalInput
                            type="select"
                            label="Group"
                            required
                            optionSelectValue={[]}
                            name="group"
                            placeholder="Select a group"
                            onChange={() => { }}
                            disabled={!editing}
                        />

                        <ModalInput
                            type="textarea"
                            label="Note"
                            name="note"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                    </Col>
                </Row>
            </div>
            <div className="detail__section">
                <div className="detail__section__header">
                    <p className="header__title">Assignment</p>
                </div>
                <Divider />
                <Row justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Status"
                            name="status"
                            disabled={!editing}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Owner"
                            name="owner"
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="User"
                            name="user"
                            disabled={!editing}
                        />
                    </Col>
                </Row>
            </div>
            <div className="detail__section">
                <div className="detail__section__header">
                    <p className="header__title">Purchasing</p>
                </div>
                <Divider />
                <Row justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="Logic Add"
                            name="logicAdd"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Price"
                            name="price"
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="Physical Add"
                            name="physicalAdd"
                            disabled={!editing}
                        />
                    </Col>
                </Row>
            </div>
            <div className="detail__section">
                <div className="detail__section__header">
                    <p className="header__title">CIA Evaluation</p>
                </div>
                <Divider />
                <Row justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="C-Confidentiality "
                            name="c"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="I-Intergrity"
                            name="i"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="A-Availability"
                            name="a"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="C + I + A"
                            name="sum"
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="Important"
                            name="important"
                            disabled={!editing}
                        />
                        <ModalInput
                            type="input"
                            label="Note"
                            name="note2"
                            onChange={() => { }}
                            disabled={!editing}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
