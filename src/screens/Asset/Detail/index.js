import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./index.scss";
import { Button, Row, Col, DatePicker } from 'antd';
import Divider from '../../../components/Seperate';
import ModalInput from '../../../components/ModalInput';
import mockData from './mockData';

export default function TabDetail() {
    const assetState = useSelector(state => state.assetReducer);
    const { chosenAsset } = assetState;
    const [editing, setEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        key: "",
        code: "",
        name: "",
        assetTypeId: "",
        assetGroupId: "",
        note: "",
        associatedAsset: [],
        siteId: "",
        status: "",
        owner: "",
        supplierId: "",
        purchaseDate: "",
        manufacturerId: "",
        price: "",
        warranty: "",
        cMark: "",
        iMark: "",
        aMark: "",
        note2: "",
        assignDateStart: "",
        assignDateEnd: "",
    });

    // componentDidMount
    useEffect(() => {
        // call api here
    }, [])

    const handleEditing = () => {
        setEditing(true);
    }

    const handleChangeInput = useCallback((e) => {
        const { name, value } = e.target;
        setEditForm(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }, []);

    // select type
    const handleChooseSelect = useCallback((value, type) => {
        setEditForm(prevState => {
            return {
                ...prevState,
                [type]: value,
            }
        })
    }, []);

    // select create date
    const handleChangeCreateDate = useCallback((date, dateString, label) => {
        console.log(label)
        setEditForm(prevState => {
            return {
                ...prevState,
                "createDate": dateString,
            }
        })
    }, []);

    const handleSubmitEdit = () => {
        console.log("Update Edit", editForm);
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
                            disabled
                            value={mockData.code}
                        />
                        <ModalInput
                            type="textarea"
                            label="Name"
                            required
                            name="name"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.name}
                        // value={editForm.name}
                        />
                        <ModalInput
                            type="select"
                            optionSelectValue={[]}
                            selectMode="multiple"
                            label="Asset Associate"
                            name="assetGroupId"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.name}
                        // value={editForm.name}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Type"
                            optionSelectValue={[]}
                            name="type"
                            placeholder="Select a type"
                            onChange={(value) => handleChooseSelect(value, 'type')}
                            disabled={!editing}
                            value={mockData.type}
                        // value={editForm.type}
                        />
                        <ModalInput
                            type="select"
                            label="Group"
                            required
                            optionSelectValue={[]}
                            name="group"
                            placeholder="Select a group"
                            onChange={(value) => handleChooseSelect(value, 'group')}
                            disabled={!editing}
                            value={mockData.group}
                        // value={editForm.group}
                        />
                        <ModalInput
                            type="input"
                            label="Unit"
                            name="unit"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.name}
                        // value={editForm.name}
                        />
                        <ModalInput
                            type="textarea"
                            label="Note"
                            name="note"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.note}
                        // value={editForm.note}
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
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.status}
                        />
                        <ModalInput
                            type="input"
                            label="Owner"
                            name="owner"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.owner}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Site"
                            required
                            optionSelectValue={[]}
                            name="site"
                            placeholder="Select a Site"
                            onChange={(value) => handleChooseSelect(value, 'site')}
                            disabled={!editing}
                            value={mockData.group}
                        // value={editForm.group}
                        />
                        <ModalInput
                            type="datepicker"
                            label="From"
                            label2="To"
                            name="assignDateStart"
                            name2="assignDateEnd"
                            onChange={handleChangeCreateDate}
                            disabled={!editing}
                            value={mockData.createDate}
                            value2={mockData.createDate}
                            line={2}
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
                            type="select"
                            label="Manufacturer"
                            required
                            optionSelectValue={[]}
                            name="manufacturerId"
                            placeholder="Select a Manufacturer"
                            onChange={(value) => handleChooseSelect(value, 'manufacturerId')}
                            disabled={!editing}
                            value={mockData.group}
                        // value={editForm.group}
                        />
                        <ModalInput
                            type="input"
                            label="Price (VND)"
                            label2="Warrantly (Month)"
                            name="price"
                            name2="warranty"
                            disabled={!editing}
                            onChange={handleChangeInput}
                            // value={mockData.price}
                            // value2={mockData.price}
                            line={2}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Supplier"
                            required
                            optionSelectValue={[]}
                            name="supplier"
                            placeholder="Select a Supplier"
                            onChange={(value) => handleChooseSelect(value, 'supplier')}
                            disabled={!editing}
                            value={mockData.group}
                        // value={editForm.group}
                        />
                        <ModalInput
                            type="datepicker"
                            label="Purchase Date"
                            name="purchaseDate"
                            onChange={handleChangeCreateDate}
                            disabled={!editing}
                            value={mockData.createDate}
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
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.c || "N/A"}
                        />
                        <ModalInput
                            type="input"
                            label="I-Intergrity"
                            name="i"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.i || "N/A"}
                        />
                        <ModalInput
                            type="input"
                            label="A-Availability"
                            name="a"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.a || "N/A"}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="C + I + A"
                            name="sum"
                            disabled={!editing}
                            value={mockData.c + mockData.i + mockData.a || "N/A"}
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
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={mockData.note2}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
