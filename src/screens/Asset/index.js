import React from "react";
import { Tabs, Button, Modal, Row, Select, Col, Input, DatePicker } from 'antd';
import TabList from "./TabList";
import TabDetail from "./TabDetail";
import TabHistory from "./TabHistory";
import "./index.scss";

function callback(key) {
    console.log(key);
}
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
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

    handleToggleAddAsset = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isOpenAddAsset: !prevState.isOpenAddAsset,
                type: ""
            }
        })
    }

    handleChooseSelect = (value) => {
        this.setState({
            type: value,
        })
    }

    handleChooseSite = (value) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                site: value,
            }
        })
    }

    handleChangeTextValue = (e) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleChangeCreateDate = (date) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                createDate: date._d,
            }
        })
    }

    handleChangeExposeDate = (date) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                exposeDate: date._d,
            }
        })
    }

    handleRenderModalField = (type) => {
        if (!type || type === "" || type.length === 0) return;
        return (
            <>
                {/* General */}
                <Row className="modal-add__section">
                    <p className="title">General</p>
                    <div className="seperate"></div>
                    <Row className="modal-add__section__item">
                        <Col span={12}>
                            <div className="input">
                                <Col span={7}><p className="input__name">Name<span className='require-text'>*</span></p></Col>
                                <Col span={17}>
                                    <TextArea
                                        name="name"
                                        rows={4}
                                        onChange={this.handleChangeTextValue}
                                    />
                                </Col>
                            </div>
                        </Col>
                        <Col span={12}>
                            {
                                type === "physical" &&
                                <div className="input">
                                    <Col span={7}><p className="input__name">Unit</p></Col>
                                    <Col span={17}>
                                        <Input
                                            name="unit"
                                            onChange={this.handleChangeTextValue}
                                        />
                                    </Col>
                                </div>
                            }
                            <div className="input">

                                <Col span={7}><p className="input__name">Note</p></Col>
                                <Col span={17}>

                                    <TextArea
                                        name="note"
                                        rows={4}
                                        onChange={this.handleChangeTextValue}
                                    />
                                </Col>
                            </div>
                        </Col>
                    </Row>
                    {
                        type === 'physical' &&
                        <>
                            <Row className="modal-add__section__item" style={{ height: '51px' }}>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Associate asset</p></Col>
                                        <Col span={17}>
                                            <Input
                                                name="associate"
                                                onChange={this.handleChangeTextValue}
                                                disabled
                                            />
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="modal-add__section__item">
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Site<span className='require-text'>*</span></p></Col>
                                        <Col span={17}>
                                            <Select className="input__select" placeholder="Select a site" onChange={this.handleChooseSite}>
                                                <Option value={`1`} >Hà Nội</Option>
                                            </Select>
                                        </Col>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">PIC</p></Col>
                                        <Col span={17}>
                                            <Input
                                                name="pic"
                                                onChange={this.handleChangeTextValue}
                                                disabled
                                            />
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    }
                </Row>
                {/* Creation */}
                {
                    type === 'infomation' &&
                    <Row className="modal-add__section">
                        <p className="title">Creation</p>
                        <div className="seperate"></div>
                        <Row className="modal-add__section__item">
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Logic Add</p></Col>
                                    <Col span={17}>
                                        <Input
                                            name="logicAdd"
                                            onChange={this.handleChangeTextValue}
                                        />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Physical Add</p></Col>
                                    <Col span={17}>
                                        <Input
                                            name="physicalAdd"
                                            onChange={this.handleChangeTextValue}
                                        />
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Created Date</p></Col>
                                    <Col span={17}>
                                        <DatePicker onChange={this.handleChangeCreateDate} />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Expose Date</p></Col>
                                    <Col span={17}>
                                        <DatePicker onChange={this.handleChangeExposeDate} />
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                }
                {/* Purchasing */}
                {
                    type !== 'infomation' &&
                    <Row className="modal-add__section">
                        <p className="title">Purchasing</p>
                        <div className="seperate"></div>
                        {
                            type === 'physical' &&
                            <Row className="modal-add__section__item">
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Manufacturer<span className='require-text'>*</span></p></Col>
                                        <Col span={17}>
                                            <Select className="input__select" placeholder="Select a type" onChange={this.handleChooseSelect}>
                                                {
                                                    typeValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                                                }
                                            </Select>
                                        </Col>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Supplier<span className='require-text'>*</span></p></Col>
                                        <Col span={17}>
                                            <Select className="input__select" placeholder="Select a type" onChange={this.handleChooseSelect}>
                                                {
                                                    typeValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                                                }
                                            </Select>
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        }
                        <Row className="modal-add__section__item">
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Purchase Date</p></Col>
                                    <Col span={17}>
                                        <DatePicker onChange={this.handleChangeCreateDate} />
                                    </Col>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Price (VND)</p></Col>
                                    <Col span={17}>
                                        <Input
                                            name="price"
                                            onChange={this.handleChangeTextValue}
                                        />
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                        {
                            type === 'physical' &&
                            <Row className="modal-add__section__item" style={{ height: '51px' }}>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Warrantly (Month)</p></Col>
                                        <Col span={17}>
                                            <Input
                                                name="unit"
                                                onChange={this.handleChangeTextValue}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        }
                        {
                            type === 'softwareService' &&
                            <Row className="modal-add__section__item">
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Logic Add</p></Col>
                                        <Col span={17}>
                                            <Input
                                                name="logicAdd"
                                                onChange={this.handleChangeTextValue}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={7}><p className="input__name">Physical Add</p></Col>
                                        <Col span={17}>
                                            <Input
                                                name="physicalAdd"
                                                onChange={this.handleChangeTextValue}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Row>
                }
            </>
        )
    }

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
                                <div className="input">
                                    <Col span={7}><p className="input__name">Type<span className='require-text'>*</span></p></Col>
                                    <Col span={17}>
                                        <Select className="input__select" placeholder="Select a type" onChange={this.handleChooseSelect}>
                                            {
                                                typeValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                                            }
                                        </Select>
                                    </Col>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="input">
                                    <Col span={7}><p className="input__name">Group<span className='require-text'>*</span></p></Col>
                                    <Col span={17}>
                                        <Select className="input__select" placeholder="Select a type" >
                                            {
                                                typeValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                                            }
                                        </Select>
                                    </Col>
                                </div>
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
