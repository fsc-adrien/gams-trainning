import React from "react";
import { Table, Col, Button, message } from "antd";
import { SearchOutlined, PlusOutlined, MoreOutlined, } from '@ant-design/icons';
import queryString from 'query-string';
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import axiosService from "../../../utils/axiosService";
import { ENDPOINT, API_ASSET, API_SEARCH_ASSET, API_CREATE_ASSET } from "../../../constants/api";
import { setAssets } from "../../../actions/action";
import { SearchInput } from "./SearchInput";
import Loading from "../../../components/Loading";
import Tag from "../../../components/Tag";
import AddModal from "./AddModal";
import "./index.scss";

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
            assetTypeId: "",
            assetGroupId: "",
            groupsValues: [],
            modalValue: {
                name: "",
                note: "",
                logicAdd: "",
                physicalAdd: "",
                createDate: "",
                exposeDate: "",
                unit: "",
                officeSiteId: "",
                pic: "",
                manufacturerId: "",
                supplierId: "",
                price: 0,
                purchaseDate: "",
                warrantyInMonth: "",
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
                assetTypeId: "",
                assetGroupId: "",
                groupsValues: [],
                modalValue: {
                    name: "",
                    note: "",
                    logicAdd: "",
                    physicalAdd: "",
                    createDate: "",
                    exposeDate: "",
                    unit: "",
                    officeSiteId: "",
                    pic: Cookies.get("id"),
                    manufacturerId: "",
                    supplierId: "",
                    price: 0,
                    purchaseDate: "",
                    warrantyInMonth: "",
                    associate: "",
                },
            }
        })
    }

    // select type
    handleChooseSelect = (value, field) => {
        const { modalValue } = this.state;
        if (field === 'assetTypeId' || field === 'assetGroupId') {
            this.setState({
                [field]: value,
            }, () => {
                const { assetTypeId } = this.state;
                if (field === 'assetTypeId')
                    this.handleFomatGroupValues(assetTypeId)
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

    // get group`s option
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

    // validate form
    isValidated = (type) => {
        const { modalValue } = this.state;
        const { manufacturerId, name, officeSiteId, supplierId } = modalValue
        switch (type) {
            case 1:
                if (name?.trim().length === 0 || manufacturerId === 0 || officeSiteId === 0 || supplierId === 0 || !manufacturerId || !officeSiteId || !supplierId) {
                    return false;
                } else {
                    return true;
                }
            case 3:
            case 2:
                if (name?.trim().length === 0) {
                    return false;
                } else {
                    return true;
                }
            default:
                break;
        }
    }

    // handle create new asset
    handleSubmitForm = (e) => {
        e.preventDefault();
        const { assetTypeId, assetGroupId, modalValue } = this.state;
        const { createDate, exposeDate, logicAdd, manufacturerId, name, note, pic, physicalAdd, price, purchaseDate, officeSiteId, supplierId, unit, warrantyInMonth } = modalValue
        let submitData;
        if ((assetTypeId && assetTypeId === 0) || (assetGroupId && assetGroupId === 0) || !assetTypeId || !assetGroupId) {
            message.error("Please fill all required fields 1");
            return;
        };
        if (!this.isValidated(assetTypeId)) {
            message.error("Please fill all required fields 2");
            return;
        };
        switch (assetTypeId) {
            case 1:
                submitData = {
                    assetTypeId,
                    assetGroupId,
                    name,
                    note,
                    unit,
                    officeSiteId,
                    pic,
                    manufacturerId,
                    supplierId,
                    price,
                    purchaseDate,
                    createDate,
                    exposeDate,
                    warrantyInMonth
                }
                break;
            case 2:
                submitData = {
                    assetTypeId,
                    assetGroupId,
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
                    assetTypeId,
                    assetGroupId,
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
        axiosService.post(`${ENDPOINT}${API_CREATE_ASSET}`, submitData)
            .then(res => {
                if (res.message) {
                    message.success(res.message)
                    this.handleToggleAddAsset();
                };

            })
            .catch(err => console.log('err', err))
            .finally(() => { })
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
        const { handleSetAssets } = this.props;
        let query;
        if (search?.owner?.trim().length > 0) {
            query = queryString.stringify(search);
        } else {
            query = `?group=${search.group}&name=${search.name}&code=${search.code}`;
        }
        this.setState({
            loading: true,
        })
        axiosService.get(`${ENDPOINT}${API_SEARCH_ASSET}?${query}`)
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
                    loading: false,
                });
            });
    }

    render() {
        const { isOpenAddAsset, assetTypeId, selectedRowKeys, assetGroupId, loading, groupsValues, modalValue } = this.state;
        const { types, assets, sites, manufacturers, suppliers } = this.props;
        const rowSelection = {
            selectedRowKeys,
            columnWidth: 20,
            onChange: this.onSelectChange,
        };

        const tableScroll = window.innerHeight - 390;

        return (
            <div className="tabList">
                {loading && <Loading />}
                {
                    isOpenAddAsset &&
                    <AddModal
                        visible={isOpenAddAsset}
                        type={assetTypeId}
                        group={assetGroupId}
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
                    scroll={{ y: tableScroll }}
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