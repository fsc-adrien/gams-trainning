import React from "react";
import { Table, Row, Col, Modal, Button, Tag } from "antd";
import { SearchOutlined, PlusOutlined, } from '@ant-design/icons';
import ModalInput from "./ModalInput";
import "./index.scss";
import { SearchInput } from "./SearchInput";
import mockData from "./mockData";

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
class TabList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Code",
                dataIndex: "code",
                sorter: (a, b) => a.code - b.code,
                render: (text, record) => {
                    return <p onClick={() => this.props.onChooseAsset(text)} style={{ color: "#007bff", marginBottom: 0, cursor: 'pointer' }}>{text}</p>
                }
            },
            {
                title: "Name",
                dataIndex: "name",
                width: 320,
            },
            {
                title: "Asset type",
                dataIndex: "type",
                filters: [
                    {
                        text: 'Infomation Asset',
                        value: 'Infomation Asset',
                    },
                    {
                        text: "Physical Asset",
                        value: "Physical Asset"
                    },
                    {
                        text: "Software & Service Asset",
                        value: "Software & Service Asset"
                    },
                ],
                onFilter: (value, record) => record.type.indexOf(value) === 0,
            },
            {
                title: "Asset group",
                dataIndex: "group",
            },
            {
                title: "Status",
                dataIndex: "status",
                filters: [
                    {
                        text: 'In use',
                        value: 'In use',
                    },
                    {
                        text: 'Destroyed',
                        value: 'Destroyed',
                    },
                    {
                        text: 'Pending Infomation',
                        value: 'Pending Infomation',
                    },
                    {
                        text: 'Lost',
                        value: 'Lost',
                    },
                ],
                onFilter: (value, record) => record.status.indexOf(value) === 0,
                width: 170,
            },
            {
                title: "Owner",
                dataIndex: "owner",
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {text && text.trim().length > 0 ? text : "N/A"}
                    </div>
                ),
                width: 350,
            },
            {
                title: "Site",
                dataIndex: "site",
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {text && text.trim().length > 0 ? text : "N/A"}
                    </div>
                ),
                width: 70,
            },
            {
                title: "Overdue",
                dataIndex: "overdue",
                filters: [
                    {
                        text: 'Yes',
                        value: 1,
                    },
                    {
                        text: 'No',
                        value: 0,
                    },
                ],
                onFilter: (value, record) => record.overdue === value,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {text === 1 ? "Yes" : "No"}
                    </div>
                ),
                width: 50,
            },
            {
                title: "CIV Evaluation",
                children: [
                    {
                        title: "C",
                        dataIndex: "c",
                        width: 70,
                        render: (text, record) => (
                            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                {text ? text : "N/A"}
                            </div>
                        ),
                    },
                    {
                        title: "I",
                        dataIndex: "i",
                        width: 70,
                        render: (text, record) => (
                            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                {text ? text : "N/A"}
                            </div>
                        ),
                    },
                    {
                        title: "A",
                        dataIndex: "a",
                        width: 70,
                        render: (text, record) => (
                            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                {text ? text : "N/A"}
                            </div>
                        ),
                    },
                    {
                        title: "Sum",
                        render: (text, record) => {
                            if (!record.c || !record.a || !record.i) return <Tag color="gray">N/A</Tag>
                            const sum = record.c + record.a + record.i;
                            return <Tag color={sum <= 7 ? 'yellow' : 'red'}>{sum}</Tag>
                        },
                        width: 70,
                    },
                ],
            },
            {
                title: "",
                width: 20,
                render: () => { },
            }
        ]
        this.state = {
            isOpenAddAsset: false,
            selectedRowKeys: "",
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
            },
            search: {
                code: "",
                name: "",
                group: "",
                owner: "",
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
                            label="Expose Date"
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
                            label="Expose Date"
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

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onChangeSearch = (e) => {
        const { search } = this.state;
        this.setState({
            search: {
                ...search,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleSearch = () => {
        const { search } = this.state;
        console.log(search)
    }

    render() {
        const { isOpenAddAsset, type, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="tabList">
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
                <Col span={15}>
                    <div className="searchField">
                        <SearchInput
                            label="Code"
                            name="code"
                            placeholder=""
                            size="small"
                            onChange={this.onChangeSearch}
                        />
                        <SearchInput
                            label="Name"
                            name="name"
                            placeholder=""
                            size="large"
                            onChange={this.onChangeSearch}
                        />
                        <SearchInput
                            label="Asset Group"
                            name="group"
                            placeholder=""
                            size="medium"
                            onChange={this.onChangeSearch}
                        />
                        <SearchInput
                            label="Owner"
                            name="owner"
                            placeholder=""
                            size="medium"
                            onChange={this.onChangeSearch}
                        />
                        <Button onClick={this.handleSearch} type="primary" className="searchBtn"> <SearchOutlined />Search</Button>
                        <Button onClick={this.handleToggleAddAsset} type="primary" className="addbtn"> <PlusOutlined />Add asset</Button>
                    </div>
                </Col>
                <Table
                    dataSource={mockData}
                    rowSelection={rowSelection}
                    columns={this.columns}
                />
            </div>
        )
    }
}

export default TabList;