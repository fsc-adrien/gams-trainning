import React from "react";
import { Table, Row, Col, Modal, Button } from "antd";
import { SearchOutlined, PlusOutlined, MoreOutlined, } from '@ant-design/icons';
import ModalInput from "../../../components/ModalInput";
import "./index.scss";
import { SearchInput } from "./SearchInput";
import mockData from "./mockData";
import Divider from "../../../components/Seperate";
import { connect } from "react-redux";
import axiosService from "../../../utils/axiosService";
import { ENDPOINT, API_ASSET } from "../../../constants/api";
import { setAssets } from "../../../actions/action";
import Loading from "../../../components/Loading";
import Tag from "../../../components/Tag";

class TabList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Code",
                dataIndex: "assetCode",
                sorter: (a, b) => a.code - b.code,
                render: (text, record) => {
                    return <p onClick={() => this.props.onChooseAsset(text)} style={{ color: "#007bff", marginBottom: 0, cursor: 'pointer' }}>{text}</p>
                },
                width: 60,
            },
            {
                title: "Name",
                dataIndex: "name",
                width: 120,
            },
            {
                title: "Asset type",
                dataIndex: "assetType",
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
                width: 90,
            },
            {
                title: "Asset group",
                dataIndex: "assetGroup",
                width: 90,
            },
            {
                title: "Status",
                dataIndex: "status",
                filters: [
                    {
                        text: 'In use',
                        value: 'In Use',
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
                width: 60,
            },
            {
                title: "Owner",
                dataIndex: "owner",
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {text && text.trim().length > 0 ? text : "N/A"}
                    </div>
                ),
                width: 120,
            },
            {
                title: "Site",
                dataIndex: "site",
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {text && text.trim().length > 0 ? text : "N/A"}
                    </div>
                ),
                width: 50,
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
                        dataIndex: "ciaC",
                        width: 40,
                        render: (text, record) => (
                            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                {text ? text : "N/A"}
                            </div>
                        ),
                    },
                    {
                        title: "I",
                        dataIndex: "ciaI",
                        width: 40,
                        render: (text, record) => {
                            return (
                                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                    {text ? text : "N/A"}
                                </div>
                            )
                        },
                    },
                    {
                        title: "A",
                        dataIndex: "ciaA",
                        width: 40,
                        render: (text, record) => (
                            <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                                {text ? text : "N/A"}
                            </div>
                        ),
                    },
                    {
                        title: "Sum",
                        render: (text, record) => {
                            if (!record.ciaC || !record.ciaA || !record.ciaI) return <Tag>N/A</Tag>
                            const sum = record.c + record.a + record.i;
                            return <Tag color={sum <= 7 ? 'yellow' : 'red'}>{sum}</Tag>
                        },
                        width: 40,
                    },
                ],
                width: 160,
            },
            {
                title: "",
                width: 30,
                render: () => <MoreOutlined style={{ cursor: 'pointer' }} />,
            }
        ]
        this.state = {
            loading: false,
            isOpenAddAsset: false,
            selectedRowKeys: [],
            type: "",
            group: "",
            groupsValues: [],
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
                associate: "",
            },
            search: {
                code: "",
                name: "",
                group: "",
                owner: "",
            }
        }
    }

    componentDidMount() {
        const { handleSetAssets } = this.props;
        this.setState({
            loading: true
        })
        axiosService.get(`${ENDPOINT}${API_ASSET}`)
            .then(res => {
                handleSetAssets(res.assets);
            })
            .catch(err => console.log('err', err))
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    // open modal
    handleToggleAddAsset = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isOpenAddAsset: !prevState.isOpenAddAsset,
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
                    associate: "",
                },
            }
        })
    }

    // select type
    handleChooseSelect = (value, field) => {
        const { modalValue, type } = this.state;
        if (field === 'type' || field === 'group') {
            this.setState({
                [field]: value,
            }, () => this.handleFomatGroupValues(this.state.type))
        } else {
            this.setState({
                modalValue: {
                    ...modalValue,
                    [field]: value,
                }
            })
        }
    }

    handleFomatGroupValues = (type) => {
        const { groups } = this.props;
        const newGroupValues = groups.filter(item => item.assetType === type);
        this.setState({
            groupsValues: newGroupValues,
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

    // select date
    handleChangeDate = (date, dateString, label) => {
        const { modalValue } = this.state;
        this.setState({
            modalValue: {
                ...modalValue,
                [label]: dateString,
            }
        })
    }

    // render general field of modal
    renderGeneralField = (type) => {
        const { modalValue } = this.state;
        const { name, unit, note, associate, site, pic } = modalValue;
        const { sites } = this.props;

        return (
            // General
            <Row className="modal-add__section">
                <p className="title">General</p>
                <Divider />
                <Row className="modal-add__section__item">
                    <Col span={12}>
                        <ModalInput
                            type="textarea"
                            label="Name"
                            required
                            name="name"
                            value={name}
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
                                value={unit}
                                onChange={this.handleChangeTextValue}
                            />
                        }
                        <ModalInput
                            type="textarea"
                            label="Note"
                            name="note"
                            value={note}
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                </Row>
                {
                    type === 1 &&
                    <>
                        <Row className="modal-add__section__item" style={{ height: '40px' }}>
                            <Col span={12}>
                                <ModalInput
                                    type="input"
                                    label="Associate asset"
                                    name="associate"
                                    value={associate}
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
                                    value={site}
                                    placeholder="Select a site"
                                    onChange={(value) => this.handleChooseSelect(value, "site")}
                                    optionSelectValue={sites}
                                />
                            </Col>
                            <Col span={12}>
                                <ModalInput
                                    type="input"
                                    label="PIC"
                                    name="pic"
                                    disabled
                                    value={pic}
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
        const { modalValue } = this.state;
        const { logicAdd, physicalAdd } = modalValue;
        return (
            //Creation
            <Row className="modal-add__section">
                <p className="title">Creation</p>
                <Divider />
                <Row className="modal-add__section__item">
                    <Col span={12}>
                        <ModalInput
                            type="input"
                            label="Logic Add"
                            name="logicAdd"
                            value={logicAdd}
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                    <Col span={12}>
                        <ModalInput
                            type="input"
                            label="Physical Add"
                            name="physicalAdd"
                            value={physicalAdd}
                            onChange={this.handleChangeTextValue}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            name="createDate"
                            onChange={this.handleChangeDate}
                        />
                    </Col>
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Expose Date"
                            name="exposeDate"
                            onChange={this.handleChangeDate}
                        />
                    </Col>
                </Row>
            </Row>
        )
    }

    // render purchasing field of modal
    renderPurchasingField = (type) => {
        const { modalValue } = this.state;
        const { manufacturer, warrantly, logicAdd, physicalAdd, supplier } = modalValue;
        const { manufacturers, suppliers } = this.props;

        return (
            //Purchasing
            <Row className="modal-add__section">
                <p className="title">Purchasing</p>
                <Divider />
                {
                    type === 1 &&
                    <Row className="modal-add__section__item">
                        <Col span={12}>
                            <ModalInput
                                type="select"
                                label="Manufacturer"
                                required
                                name="manufacturer"
                                placeholder="Select a manufacturer"
                                onChange={(value) => this.handleChooseSelect(value, "manufacturer")}
                                optionSelectValue={manufacturers}
                                value={manufacturer}
                            />
                        </Col>
                        <Col span={12}>
                            <ModalInput
                                type="select"
                                label="Supplier"
                                required
                                name="supplier"
                                placeholder="Select a supplier"
                                onChange={(value) => this.handleChooseSelect(value, "supplier")}
                                optionSelectValue={suppliers}
                                value={supplier}
                            />
                        </Col>
                    </Row>
                }
                <Row className="modal-add__section__item">
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            name="createDate"
                            onChange={this.handleChangeDate}
                        />
                    </Col>
                    <Col span={12}>
                        <ModalInput
                            type="datepicker"
                            label="Expose Date"
                            name="exposeDate"
                            onChange={this.handleChangeDate}
                        />
                    </Col>
                </Row>
                {
                    type === 1 &&
                    <Row className="modal-add__section__item" style={{ height: '40px' }}>
                        <Col span={12}>
                            <ModalInput
                                type="input"
                                label="Warrantly (Month)"
                                name="warrantly"
                                onChange={this.handleChangeTextValue}
                                value={warrantly}
                            />
                        </Col>
                    </Row>
                }
                {
                    type === 3 &&
                    <Row className="modal-add__section__item">
                        <Col span={12}>
                            <ModalInput
                                type="input"
                                label="Logic Add"
                                name="logicAdd"
                                onChange={this.handleChangeTextValue}
                                value={logicAdd}
                            />

                        </Col>
                        <Col span={12}>
                            <ModalInput
                                type="input"
                                label="Physical Add"
                                name="physicalAdd"
                                onChange={this.handleChangeTextValue}
                                value={physicalAdd}
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
                {type === 2 && this.renderCreationField(type)}
                {/* Purchasing */}
                {type !== 2 && this.renderPurchasingField(type)}
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
            case 1:
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
            case 2:
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
            case 3:
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
        const { isOpenAddAsset, type, selectedRowKeys, group, loading, groupsValues } = this.state;
        const { types, assets } = this.props;
        const rowSelection = {
            selectedRowKeys,
            columnWidth: 20,
            onChange: this.onSelectChange,
        };

        return (
            <div className="tabList">
                {loading && <Loading />}
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
                                    optionSelectValue={types}
                                    name="type"
                                    placeholder="Select a type"
                                    value={type}
                                    onChange={(value) => this.handleChooseSelect(value, "type")}
                                />
                            </Col>
                            <Col span={12}>
                                <ModalInput
                                    type="select"
                                    label="Group"
                                    required
                                    optionSelectValue={groupsValues}
                                    name="group"
                                    value={group}
                                    placeholder="Select a group"
                                    onChange={(value) => this.handleChooseSelect(value, "group")}
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
                    scroll={{ y: 300 }}
                    dataSource={assets}
                    rowSelection={rowSelection}
                    columns={this.columns}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        types: state.assetReducer.types,
        groups: state.assetReducer.groups,
        manufacturers: state.assetReducer.manufacturers,
        suppliers: state.assetReducer.suppliers,
        sites: state.assetReducer.sites,
        assets: state.assetReducer.assets
    };
}

const mapDispathcToProps = (dispatch) => {
    return {
        handleSetAssets: (assets) => { dispatch(setAssets(assets)) },
    }
}

export default connect(mapStateToProps, mapDispathcToProps)(TabList);