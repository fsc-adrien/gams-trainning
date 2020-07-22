import React, { PureComponent } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Col, Row } from 'antd'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import ModalInput from '../../../components/ModalInput'
import Divider from '../../../components/Seperate'

export class AddModal extends PureComponent {
    static propTypes = {
        types: PropTypes.array.isRequired,
        groups: PropTypes.array.isRequired,
        sites: PropTypes.array.isRequired,
        manufacturers: PropTypes.array.isRequired,
        suppliers: PropTypes.array.isRequired,
        visible: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
        modalValue: PropTypes.object.isRequired,
        handleOnChangeText: PropTypes.func.isRequired,
        handleOnSelect: PropTypes.func.isRequired,
        handleOnChangeDate: PropTypes.func.isRequired,
        handleOpen: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }

    // render general field of modal
    renderGeneralField = (type) => {
        const { sites, handleOnChangeText, handleOnSelect, modalValue } = this.props;
        const { name, unit, note, associate, site } = modalValue;

        return (
            // General
            <Row className="modal-add__section">
                <p className="title">General</p>
                <Divider />
                <Row className="modal-add__section__item" justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="textarea"
                            label="Name"
                            required
                            name="name"
                            value={name}
                            onChange={handleOnChangeText}
                        />
                    </Col>
                    <Col span={10}>
                        {
                            type === 1 &&
                            <ModalInput
                                type="input"
                                label="Unit"
                                name="unit"
                                value={unit}
                                onChange={handleOnChangeText}
                            />
                        }
                        <ModalInput
                            type="textarea"
                            label="Note"
                            name="note"
                            value={note}
                            onChange={handleOnChangeText}
                        />
                    </Col>
                </Row>
                {
                    type === 1 &&
                    <>
                        <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                            <Col span={10}>
                                <ModalInput
                                    type="input"
                                    label="Associate asset"
                                    name="associate"
                                    value={associate}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                            <Col span={10}>
                                <ModalInput
                                    type="select"
                                    label="Site"
                                    required
                                    name="officeSiteId"
                                    value={site}
                                    placeholder="Select a site"
                                    onChange={(value) => handleOnSelect(value, "officeSiteId")}
                                    optionSelectValue={sites}
                                />
                            </Col>
                            <Col span={10}>
                                <ModalInput
                                    type="input"
                                    label="PIC"
                                    name="pic"
                                    disabled
                                    value={Cookies.get("fullName")}
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
        const { handleOnChangeText, modalValue, handleOnChangeDate } = this.props;
        const { logicAdd, physicalAdd, } = modalValue;
        return (
            //Creation
            <Row className="modal-add__section">
                <p className="title">Creation</p>
                <Divider />
                <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Logic Add"
                            name="logicAdd"
                            value={logicAdd}
                            onChange={handleOnChangeText}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Physical Add"
                            name="physicalAdd"
                            value={physicalAdd}
                            onChange={handleOnChangeText}
                        />
                    </Col>
                </Row>
                <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="datepicker"
                            label="Created Date"
                            name="createDate"
                            onChange={handleOnChangeDate}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="datepicker"
                            label="Expose Date"
                            name="exposeDate"
                            onChange={handleOnChangeDate}
                        />
                    </Col>
                </Row>
            </Row>
        )
    }

    // render purchasing field of modal
    renderPurchasingField = (type) => {
        const { manufacturers, suppliers, modalValue, handleOnChangeText, handleOnSelect, handleOnChangeDate } = this.props;
        const { manufacturer, warrantly, logicAdd, physicalAdd, supplier, price } = modalValue;

        return (
            //Purchasing
            <Row className="modal-add__section">
                <p className="title">Purchasing</p>
                <Divider />
                {
                    type === 1 &&
                    <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                        <Col span={10}>
                            <ModalInput
                                type="select"
                                label="Manufacturer"
                                required
                                name="manufacturerId"
                                placeholder="Select a manufacturer"
                                onChange={(value) => handleOnSelect(value, "manufacturerId")}
                                optionSelectValue={manufacturers}
                                value={manufacturer}
                            />
                        </Col>
                        <Col span={10}>
                            <ModalInput
                                type="select"
                                label="Supplier"
                                required
                                name="supplierId"
                                placeholder="Select a supplier"
                                onChange={(value) => handleOnSelect(value, "supplierId")}
                                optionSelectValue={suppliers}
                                value={supplier}
                            />
                        </Col>
                    </Row>
                }

                <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="input"
                            label="Price (VND)"
                            name="price"
                            value={price}
                            onChange={handleOnChangeText}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="datepicker"
                            label="Purchase Date"
                            name="purchaseDate"
                            onChange={handleOnChangeDate}
                        />
                    </Col>
                </Row>
                {
                    type === 1 &&
                    <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                        <Col span={10}>
                            <ModalInput
                                type="input"
                                label="Warrantly (Month)"
                                name="warrantyInMonth"
                                onChange={handleOnChangeText}
                                value={warrantly}
                            />
                        </Col>
                    </Row>
                }
                {
                    type === 3 &&
                    <Row className="modal-add__section__item" style={{ height: '40px' }} justify="space-between">
                        <Col span={10}>
                            <ModalInput
                                type="input"
                                label="Logic Add"
                                name="logicAdd"
                                onChange={handleOnChangeText}
                                value={logicAdd}
                            />

                        </Col>
                        <Col span={10}>
                            <ModalInput
                                type="input"
                                label="Physical Add"
                                name="physicalAdd"
                                onChange={handleOnChangeText}
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
    render() {
        const { type, handleOnSelect, handleOpen, handleSubmit, visible, types, groups, group } = this.props;

        return (
            <Modal
                className="modal-add"
                title="Add new asset"
                visible={visible}
                onCancel={handleOpen}
                okText="Save"
                onOk={handleSubmit}
            >
                <Row justify="space-between">
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Type"
                            required
                            optionSelectValue={types}
                            name="assetTypeId"
                            placeholder="Select a type"
                            value={type}
                            onChange={(value) => handleOnSelect(value, "assetTypeId")}
                        />
                    </Col>
                    <Col span={10}>
                        <ModalInput
                            type="select"
                            label="Group"
                            required
                            optionSelectValue={groups}
                            name="assetGroupId"
                            value={group}
                            placeholder="Select a group"
                            onChange={(value) => handleOnSelect(value, "assetGroupId")}
                        />
                    </Col>
                </Row>
                {
                    this.handleRenderModalField(type)
                }
            </Modal>
        )
    }
}

export default AddModal



