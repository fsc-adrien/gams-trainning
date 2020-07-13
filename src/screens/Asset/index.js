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
            modalValue: {
                type: "",
                name: "",
                note: "",
                logicAdd: "",
                physicalAdd: "",
            }
        }
    }

    handleToggleAddAsset = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isOpenAddAsset: !prevState.isOpenAddAsset,
            }
        })
    }

    handleChooseSelect = (value) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                type: value,
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

    handleChangeDate = (date, dateString) => {
        console.log('date', date)
    }

    render() {
        const { isOpenAddAsset } = this.state;
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
                    >
                        <Row>
                            <Col span={12}>
                                <div className="input">
                                    <Col span={6}><p className="input__name">Type<span className='require-text'>*</span></p></Col>
                                    <Col span={18}>
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
                                    <Col span={6}><p className="input__name">Group<span className='require-text'>*</span></p></Col>
                                    <Col span={18}>
                                        <Select className="input__select" placeholder="Select a type" onChange={this.handleChooseSelect}>
                                            {
                                                typeValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                                            }
                                        </Select>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                        <Row className="modal-add__section">
                            <p className="title">General</p>
                            <div className="seperate"></div>
                            <Row className="modal-add__section__item">
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={6}><p className="input__name">Name<span className='require-text'>*</span></p></Col>
                                        <Col span={18}>
                                            <TextArea
                                                name="name"
                                                rows={4}
                                                onChange={this.handleChangeTextValue}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={6}><p className="input__name">Note</p></Col>
                                        <Col span={18}>
                                            <TextArea
                                                name="note"
                                                rows={4}
                                                onChange={this.handleChangeTextValue}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                        <Row className="modal-add__section">
                            <p className="title">Creation</p>
                            <div className="seperate"></div>
                            <Row className="modal-add__section__item">
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={6}><p className="input__name">Logic Add</p></Col>
                                        <Col span={18}>
                                            <Input
                                                name="logicAdd"
                                                onChange={this.handleChangeTextValue}
                                            />
                                        </Col>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={6}><p className="input__name">Physical Add</p></Col>
                                        <Col span={18}>
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
                                        <Col span={6}><p className="input__name">Created Date</p></Col>
                                        <Col span={18}>
                                            <DatePicker onChange={this.handleChangeDate} />
                                        </Col>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="input">
                                        <Col span={6}><p className="input__name">Expose Date</p></Col>
                                        <Col span={18}>
                                            <DatePicker onChange={this.handleChangeDate} />
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
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
