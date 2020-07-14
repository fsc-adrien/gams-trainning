import React from "react";
import { Tabs, Button, Modal, Row, Select, Col } from 'antd';
import TabList from "./TabList";
import TabDetail from "./TabDetail";
import TabHistory from "./TabHistory";
import "./index.scss";
import ModalInput from "./ModalInput";

function callback(key) {
    console.log(key);
}
const { TabPane } = Tabs;
const typeValue = [
    {
        name: "Infomation Asset",
        value: "infomation"
    },
    {
        name: "Physical Asset",
        value: "physical"
    },
    {
        name: "Software & Service Asset",
        value: "softwareService"
    },
];

class Asset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenAddAsset: false,
            type: "",
            group: "",
            modalValue: {
                name: "",
                note: "",
                logicAdd: "",
                physicalAdd: "",
                createDate: "",
                exposeDate: "",
                unit: "",
                site: "",
                pic: "",
                manufacturer: "",
                supplier: "",
                price: 0,
                purchaseDate: "",
                warrantly: "",
            }
        }
    }

    // open modal
    handleToggleAddAsset = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isOpenAddAsset: !prevState.isOpenAddAsset,
                type: ""
            }
        })
    }

    // select type
    handleChooseSelect = (value) => {
        this.setState({
            type: value,
        })
    }

    // select site
    handleChooseSite = (value) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                site: value,
            }
        })
    }

    // change text
    handleChangeTextValue = (e) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                [e.target.name]: e.target.value,
            }
        })
    }

    // select create date
    handleChangeCreateDate = (date) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                createDate: date._d,
            }
        })
    }

    // select expose date
    handleChangeExposeDate = (date) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                exposeDate: date._d,
            }
        })
    }

    // render general field of modal
    renderGeneralField = (type) => {
        return (
            // General
            <Row className="modal-add__section">
                <p className="title">General</p>
                <div className="seperate"></div>
                <Row className="modal-add__section__item">
                    <Col span={12}>
                        <ModalInput
                            type="textarea"
                            label="Name"
                            required
                            name="name"
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                    <Col span={12}>
                        {
                            type === "physical" &&
                            <ModalInput
                                type="input"
                                label="Unit"
                                name="unit"
                                onChange={this.handleChangeTextValue}
                            />
                        }
                        <ModalInput
                            type="textarea"
                            label="Note"
                            name="note"
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                </Row>
                {
                    type === 'physical' &&
                    <>
                        <Row className="modal-add__section__item" style={{ height: '51px' }}>
                            <Col span={12}>
                                <ModalInput
                                    type="input"
                                    label="Associate asset"
                                    name="associate"
                                    onChange={this.handleChangeTextValue}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row className="modal-add__section__item">
                            <Col span={12}>
                                <ModalInput
                                    type="select"
                                    label="Site"
                                    required
                                    name="site"
                                    placeholder="Select a site"
                                    onChange={this.handleChooseSite}
                                    optionSelectValue={['Hà Nội']}
                                />
                            </Col>
                            <Col span={12}>
                                <ModalInput
                                    type="input"
                                    label="PIC"
                                    name="pic"
                                    onChange={this.handleChangeTextValue}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </>
                }
            </Row>
        )
    }

    // render creation field of modal
    renderCreationField = (type) => {
        return (
            //Creation
            <Row className="modal-add__section">
                <p className="title">Creation</p>
                <div className="seperate"></div>
                <Row className="modal-add__section__item">
                    <Col span={12}>
                        <ModalInput
                            type="input"
                            label="Logic Add"
                            name="logicAdd"
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                    <Col span={12}>
                        <ModalInput
                            type="input"
                            label="Physical Add"
                            name="physicalAdd"
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            onChange={this.handleChangeCreateDate}
                        />
                    </Col>
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            onChange={this.handleChangeExposeDate}
                        />
                    </Col>
                </Row>
            </Row>
        )
    }

    // render purchasing field of modal
    renderPurchasingField = (type) => {
        return (
            //Purchasing
            <Row className="modal-add__section">
                <p className="title">Purchasing</p>
                <div className="seperate"></div>
                {
                    type === 'physical' &&
                    <Row className="modal-add__section__item">
                        <Col span={12}>
                            <ModalInput
                                type="select"
                                label="Manufacturer"
                                required
                                name="manufacturer"
                                placeholder="Select a type"
                                onChange={this.handleChooseSelect}
                                optionSelectValue={typeValue}
                            />
                        </Col>
                        <Col span={12}>
                            <ModalInput
                                type="select"
                                label="Manufacturer"
                                required
                                name="manufacturer"
                                placeholder="Select a type"
                                onChange={this.handleChooseSelect}
                                optionSelectValue={typeValue}
                            />
                        </Col>
                    </Row>
                }
                <Row className="modal-add__section__item">
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            onChange={this.handleChangeCreateDate}
                        />
                    </Col>
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            onChange={this.handleChangeExposeDate}
                        />
                    </Col>
                </Row>
                {
                    type === 'physical' &&
                    <Row className="modal-add__section__item" style={{ height: '51px' }}>
                        <Col span={12}>
                            <ModalInput
                                type="input"
                                label="Warrantly (Month)"
                                name="warrantly"
                                onChange={this.handleChangeTextValue}
                            />
                        </Col>
                    </Row>
                }
                {
                    type === 'softwareService' &&
                    <Row className="modal-add__section__item">
                        <Col span={12}>
                            <ModalInput
                                type="input"
                                label="Logic Add"
                                name="logicAdd"
                                onChange={this.handleChangeTextValue}
                            />

                        </Col>
                        <Col span={12}>
                            <ModalInput
                                type="input"
                                label="Physical Add"
                                name="physicalAdd"
                                onChange={this.handleChangeTextValue}
                            />
                        </Col>
                    </Row>
                }
            </Row>
        )
    }

    // render modal 
    handleRenderModalField = (type) => {
        if (!type || type === "" || type.length === 0) return;
        return (
            <>
                {/* General */}
                {this.renderGeneralField(type)}
                {/* Creation */}
                {type === 'infomation' && this.renderCreationField(type)}
                {/* Purchasing */}
                {type !== 'infomation' && this.renderPurchasingField(type)}
            </>
        )
    }

    // handle create new asset
    handleSubmitForm = (e) => {
        e.preventDefault();
        const { type, group, modalValue } = this.state;
        const { createDate, exposeDate, logicAdd, manufacturer, name, note, pic, physicalAdd, price, purchaseDate, site, supplier, unit, warrantly } = modalValue
        let submitData;
        switch (type) {
            case 'infomation':
                submitData = {
                    type,
                    group,
                    name,
                    note,
                    logicAdd,
                    physicalAdd,
                    createDate,
                    exposeDate
                }
                break;
            case 'physical':
                submitData = {
                    type,
                    group,
                    name,
                    note,
                    unit,
                    site,
                    pic,
                    manufacturer,
                    supplier,
                    price,
                    purchaseDate,
                    warrantly
                }
                break;
            case 'softwareService':
                submitData = {
                    type,
                    group,
                    name,
                    note,
                    purchaseDate,
                    price,
                    logicAdd,
                    physicalAdd
                }
                break;
            default:
                break;
        }
        console.log('submitData', submitData)
    }

    render() {
        const { isOpenAddAsset, type } = this.state;
        return (
            <div className="asset">
                <Button onClick={this.handleToggleAddAsset}>Add asset</Button>
                {
                    isOpenAddAsset &&
                    <Modal
                        className="modal-add"
                        title="Add new asset"
                        visible={isOpenAddAsset}
                        onCancel={this.handleToggleAddAsset}
                        okText="Save"
                        onOk={this.handleSubmitForm}
                    >
                        <Row>
                            <Col span={12}>
                                <ModalInput
                                    type="select"
                                    label="Type"
                                    required
                                    optionSelectValue={typeValue}
                                    name="type"
                                    placeholder="Select a type"
                                    onChange={this.handleChooseSelect}
                                />
                            </Col>
                            <Col span={12}>
                                <ModalInput
                                    type="select"
                                    label="Group"
                                    required
                                    optionSelectValue={typeValue}
                                    name="group"
                                    placeholder="Select a type"
                                    onChange={this.handleChooseSelect}
                                />
                            </Col>
                        </Row>
                        {
                            this.handleRenderModalField(type)
                        }
                    </Modal>
                }
                <Tabs defaultActiveKey="1" onChange={callback} style={{ marginLeft: '20px' }}>
                    <TabPane tab="List" key="1">
                        <TabList />
                    </TabPane>
                    <TabPane tab="Detail" key="2">
                        <TabDetail />
                    </TabPane>
                    <TabPane tab="History" key="3">
                        <TabHistory />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Asset;
