import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import "./index.scss";
import { Button, Row, Col, AutoComplete, Tag } from 'antd';
import Divider from '../../../components/Seperate';
import ModalInput from '../../../components/ModalInput';
import axiosService from '../../../utils/axiosService';
import { ENDPOINT, API_ASSET_DETAIL, API_ASSOCIATED_ASSET } from '../../../constants/api';
import Loading from '../../../components/Loading';

export default function TabDetail() {
    const assetState = useSelector(state => state.assetReducer);
    const {
        chosenAsset,
        types,
        groups,
        manufacturers,
        suppliers,
        sites
    } = assetState;
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [groupValues, setGroupValues] = useState(groups);
    const [autoOptions, setAutoOptions] = useState([]);
    const [chosenAssociatedAsset, setChosenAssociatedAsset] = useState([]);

    // componentDidMount
    useEffect(() => {
        // call api here
        setLoading(true);
        axiosService.get(`${ENDPOINT}${API_ASSET_DETAIL}${chosenAsset}`)
            .then(res => {
                setEditForm(res.asset)
                const type = Number.parseInt(res.asset.assetType);
                const newGroupValues = groups.filter(item => item.assetType === type);
                setChosenAssociatedAsset(res.asset.associatedAssetCode || []);
                setGroupValues(newGroupValues);
            })
            .catch(err => console.log('err', err))
            .finally(() => setLoading(false));
    }, [chosenAsset])

    // componentDidUpdate
    useEffect(() => {
        const { ciaA, ciaC, ciaI } = editForm;
        if (ciaI > 0 && ciaA > 0 && ciaC > 0) {
            const sum = ciaA + ciaC + ciaI;
            setEditForm(prevState => {
                return {
                    ...prevState,
                    'ciaSum': sum
                }
            })
        }
    }, [editForm.ciaI, editForm.ciaC, editForm.ciaA])

    // componentDidUpdate
    useEffect(() => {
        let importance = "";
        if (0 < editForm.ciaSum && editForm.ciaSum <= 4) {
            importance = "Low";
        } else if (editForm.ciaSum === 5) {
            importance = "Medium";
        } else if (5 < editForm.ciaSum && editForm.ciaSum <= 7) {
            importance = "High";
        } else if (editForm.ciaSum > 7) {
            importance = "Special";
        }
        setEditForm(prevState => {
            return {
                ...prevState,
                'ciaImportance': importance,
            }
        });
    }, [editForm.ciaSum])

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
        setEditForm(prevState => {
            return {
                ...prevState,
                [label]: dateString,
            }
        })
    }, []);

    const handleSearchAssociated = (searchTxt) => {
        if (searchTxt && searchTxt.trim().length > 0) {
            axiosService.get(`${ENDPOINT}${API_ASSOCIATED_ASSET}?search=${searchTxt}`)
                .then(res => {
                    const options = res.results.map(item => {
                        return {
                            ...item,
                            value: item.assetCode
                        }
                    })
                    setAutoOptions(options)
                })
        }
    }

    const handleSelectAssociated = (value, option) => {
        console.log('value', option);
        let chosen = [...chosenAssociatedAsset, option];
        setChosenAssociatedAsset(chosen);
    }

    const handleSubmitEdit = () => {
        console.log("Update Edit", editForm);
        setEditing(false);
    }

    return (
        <div className="detail">
            {loading && <Loading />}
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
                            value={editForm.assetCode}
                        />
                        <ModalInput
                            type="textarea"
                            label="Name"
                            required
                            name="name"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={editForm.name}
                        />
                        <div className="input">
                            <Col span={7}><p className="input__name">Associated asset</p></Col>
                            <Col span={17}>
                                <AutoComplete
                                    style={{
                                        width: '100%',
                                    }}
                                    options={autoOptions}
                                    onSelect={handleSelectAssociated}
                                    onSearch={handleSearchAssociated}
                                    disabled={!editing}
                                />
                                <div style={{ marginTop: '10px' }}>
                                    {
                                        chosenAssociatedAsset?.length > 0 &&
                                        chosenAssociatedAsset.map(item => {
                                            return <Tag closable onClose={() => { }}>{item.name}</Tag>
                                        })
                                    }
                                </div>
                            </Col>
                        </div>
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Type"
                            optionSelectValue={types}
                            name="assetType"
                            placeholder="Select a type"
                            disabled
                            value={Number.parseInt(editForm.assetType)}
                        />
                        <ModalInput
                            type="select"
                            label="Group"
                            required
                            optionSelectValue={groupValues}
                            name="assetGroup"
                            placeholder="Select a group"
                            onChange={(value) => handleChooseSelect(value, 'assetGroup')}
                            disabled={!editing}
                            value={Number.parseInt(editForm.assetGroup)}
                        />
                        <ModalInput
                            type="input"
                            label="Unit"
                            name="unit"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={editForm.unit}
                        />
                        <ModalInput
                            type="textarea"
                            label="Note"
                            name="note"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={editForm.note}
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
                            value={editForm.assetStatus}
                        />
                        <ModalInput
                            type="input"
                            label="Owner"
                            name="owner"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={editForm.owner}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Site"
                            required
                            optionSelectValue={sites}
                            name="site"
                            placeholder="Select a Site"
                            onChange={(value) => handleChooseSelect(value, 'officeSite')}
                            disabled={!editing}
                            value={Number.parseInt(editForm.officeSite)}
                        />
                        <ModalInput
                            type="datepicker"
                            label="From"
                            label2="To"
                            name="assignDateStart"
                            name2="assignDateEnd"
                            onChange={handleChangeCreateDate}
                            disabled={!editing}
                            value={editForm.assignDateStart}
                            value2={editForm.assignDateEnd}
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
                            optionSelectValue={manufacturers}
                            name="manufacturer"
                            placeholder="Select a Manufacturer"
                            onChange={(value) => handleChooseSelect(value, 'manufacturer')}
                            disabled={!editing}
                            value={Number.parseInt(editForm.manufacturer)}
                        />
                        <ModalInput
                            type="input"
                            label="Price (VND)"
                            label2="Warrantly (Month)"
                            name="price"
                            name2="warrantyInMonth"
                            disabled={!editing}
                            onChange={handleChangeInput}
                            value={editForm.price}
                            value2={editForm.warrantyInMonth}
                            line={2}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Supplier"
                            required
                            optionSelectValue={suppliers}
                            name="supplier"
                            placeholder="Select a Supplier"
                            onChange={(value) => handleChooseSelect(value, 'supplier')}
                            disabled={!editing}
                            value={Number.parseInt(editForm.supplier)}
                        />
                        <ModalInput
                            type="datepicker"
                            label="Purchase Date"
                            name="purchaseDate"
                            onChange={handleChangeCreateDate}
                            disabled={!editing}
                            value={editForm.purchaseDate}
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
                            type="select"
                            label="C-Confidentiality "
                            name="ciaC"
                            optionSelectValue={[{
                                name: "1",
                                value: 1,
                            }, {
                                name: "2",
                                value: 2,
                            }, {
                                name: "3",
                                value: 3,
                            },]}
                            onChange={(value) => handleChooseSelect(value, 'ciaC')}
                            disabled={!editing}
                            value={editForm.ciaC}
                        />
                        <ModalInput
                            type="select"
                            label="I-Intergrity"
                            name="ciaI"
                            optionSelectValue={[{
                                name: "1",
                                value: 1,
                            }, {
                                name: "2",
                                value: 2,
                            }, {
                                name: "3",
                                value: 3,
                            },]}
                            onChange={(value) => handleChooseSelect(value, 'ciaI')}
                            disabled={!editing}
                            value={editForm.ciaI}
                        />
                        <ModalInput
                            type="select"
                            label="A-Availability"
                            name="ciaA"
                            optionSelectValue={[{
                                name: "1",
                                value: 1,
                            }, {
                                name: "2",
                                value: 2,
                            }, {
                                name: "3",
                                value: 3,
                            },]}
                            onChange={(value) => handleChooseSelect(value, 'ciaA')}
                            disabled={!editing}
                            value={editForm.ciaA}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="C + I + A"
                            name="ciaSum"
                            disabled={!editing}
                            value={editForm.ciaSum}
                        />
                        <ModalInput
                            type="input"
                            label="Importance"
                            name="ciaImportance"
                            disabled={!editing}
                            value={editForm.ciaImportance}
                        />
                        <ModalInput
                            type="input"
                            label="Note"
                            name="ciaNote"
                            onChange={handleChangeInput}
                            disabled={!editing}
                            value={editForm.ciaNote}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
