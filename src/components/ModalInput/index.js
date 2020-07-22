import React from 'react';
import moment from 'moment';
import { Input, Select, DatePicker, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './index.scss';

const { Option } = Select

// Input in Modal Add New Asset
const ModalInput = ({
    label,
    label2,
    required,
    name,
    name2,
    type = 'input',
    placeholder,
    onChange,
    optionSelectValue = [{
        name: "",
        value: "",
    }],
    disabled,
    value,
    value2,
    selectMode,
    line,
    ...rest
}) => {
    const renderInput = (type, value, name) => {
        switch (type) {
            case "input":
                return (
                    <Input
                        name={name}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder={placeholder}
                        value={value}
                    />
                )
            case "textarea":
                return (
                    <TextArea
                        name={name}
                        rows={4}
                        onChange={onChange}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                    />
                )
            case "datepicker":
                return (
                    <DatePicker onChange={(date, dateString) => onChange(date, dateString, name)} disabled={disabled} value={value && value.length > 0 && moment(value)} style={line === 2 ? { width: '100%' } : {}} />
                )
            case "select":
                return (
                    <Select
                        className="input__select"
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        disabled={disabled}
                        mode={selectMode}
                    >
                        {
                            optionSelectValue && optionSelectValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                        }
                    </Select>
                )
            default:
                break;
        }
    }

    if (line === 2) {
        return (
            <div className="input" {...rest} style={{ justifyContent: 'space-between' }}>
                <Col span={7}><p className="input__name">{label}{required && <span className='require-text'>*</span>}</p></Col>
                <Col span={5}>
                    {renderInput(type, value, name)}
                </Col>
                <Col span={7}><p className="input__name" style={{ marginLeft: '50px' }}>{label2}{required && <span className='require-text'>*</span>}</p></Col>
                <Col span={5}>
                    {renderInput(type, value2, name2)}
                </Col>
            </div>
        )
    } else {
        return (
            <div className="input" {...rest}>
                <Col span={7}><p className="input__name">{label}{required && <span className='require-text'>*</span>}</p></Col>
                <Col span={17}>
                    {renderInput(type, value, name)}
                </Col>
            </div>
        )
    }
}

export default ModalInput
