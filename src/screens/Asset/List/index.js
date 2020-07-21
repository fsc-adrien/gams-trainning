import React from "react";
import { Table, Col, Button } from "antd";
import { SearchOutlined, PlusOutlined, MoreOutlined, } from '@ant-design/icons';
import "./index.scss";
import { SearchInput } from "./SearchInput";
import { connect } from "react-redux";
import axiosService from "../../../utils/axiosService";
import { ENDPOINT, API_ASSET } from "../../../constants/api";
import { setAssets } from "../../../actions/action";
import Loading from "../../../components/Loading";
import Tag from "../../../components/Tag";
import AddModal from "./AddModal";

class TabList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Code",
                dataIndex: "assetCode",
                sorter: (a, b) => a.code - b.code,
                render: (text, record) => {
                    return <p onClick={() => this.props.onChooseAsset(record.id)} style={{ color: "#007bff", marginBottom: 0, cursor: 'pointer' }}>{text}</p>
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
                onFilter: (value, record) => record.assetType.indexOf(value) === 0,
                width: 90,
            },
            {
                title: "Asset group",
                dataIndex: "assetGroup",
                width: 90,
            },
            {
                title: "Status",
                dataIndex: "assetStatus",
                filters: [
                    { id: "0", value: "Available", text: "Available" },
                    { id: "1", value: "In Use", text: "In Use" },
                    { id: "2", value: "Lost", text: "Lost" },
                    { id: "3", value: "Liquidated", text: "Liquidated" },
                    { id: "4", value: "Under Repair", text: "Under Repair" },
                    { id: "5", value: "Malfunctioning", text: "Malfunctioning" },
                    { id: "6", value: "Pending Confirmation", text: "Pending Confirmation" },
                    { id: "7", value: "Checked out", text: "Checked out" },
                    { id: "8", value: "Destroyed", text: "Destroyed" },
                    { id: "9", value: "Expired", text: "Expired" },
                ],
                onFilter: (value, record) => record.assetStatus.indexOf(value) === 0,
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
                        value: true,
                    },
                    {
                        text: 'No',
                        value: false,
                    },
                ],
                onFilter: (value, record) => record.overdue === value,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
                        {text ? "Yes" : "No"}
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
        const { handleSetAssets, onClearChosen } = this.props;
        onClearChosen();
        this.setState({
            loading: true
        })
        axiosService.get(`${ENDPOINT}${API_ASSET}`)
            .then(res => {
                const newArrAssets = res.assets.map(item => {
                    return {
                        ...item,
                        key: item.assetCode,
                    }
                })
                handleSetAssets(newArrAssets);
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
            }
        })
    }

    // select type
    handleChooseSelect = (value, field) => {
        const { modalValue } = this.state;
        if (field === 'type' || field === 'group') {
            this.setState({
                [field]: value,
            }, () => {
                const { type } = this.state;
                if (field === 'type')
                    this.handleFomatGroupValues(type)
            })
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
            group: "",
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
                    createDate,
                    exposeDate,
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
        const { isOpenAddAsset, type, selectedRowKeys, group, loading, groupsValues, modalValue } = this.state;
        const { types, assets, sites, manufacturers, suppliers } = this.props;
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
                    <AddModal
                        visible={isOpenAddAsset}
                        type={type}
                        group={group}
                        modalValue={modalValue}
                        types={types}
                        groups={groupsValues}
                        sites={sites}
                        manufacturers={manufacturers}
                        suppliers={suppliers}
                        handleOnChangeText={this.handleChangeTextValue}
                        handleOnSelect={this.handleChooseSelect}
                        handleOnChangeDate={this.handleChangeDate}
                        handleOpen={this.handleToggleAddAsset}
                        handleSubmit={this.handleSubmitForm}
                    />
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
        assets: state.assetReducer.assets,
        status: state.assetReducer.status
    };
}

const mapDispathcToProps = (dispatch) => {
    return {
        handleSetAssets: (assets) => { dispatch(setAssets(assets)) },
    }
}

export default connect(mapStateToProps, mapDispathcToProps)(TabList);