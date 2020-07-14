import React from 'react'
import { Input, Select, DatePicker, Col } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select

// Input in Modal Add New Asset
const ModalInput = ({
    label,
    required,
    name,
    type = 'input',
    placeholder,
    onChange,
    optionSelectValue = [],
    disabled,
    ...rest
}) => {
    const renderInput = (type) => {
        switch (type) {
            case "input":
                return (
                    <Input
                        name={name}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                )
            case "textarea":
                return (
                    <TextArea
                        name={name}
                        rows={4}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
                )
            case "datepicker":
                return (
                    <DatePicker onChange={onChange} />
                )
            case "select":
                return (
                    <Select className="input__select" placeholder={placeholder} onChange={onChange} >
                        {
                            optionSelectValue && optionSelectValue.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)
                        }
                    </Select>
                )
            default:
                break;
        }
    }


    return (
        <div className="input" {...rest}>
            <Col span={7}><p className="input__name">{label}{required && <span className='require-text'>*</span>}</p></Col>
            <Col span={17}>
                {renderInput(type)}
            </Col>
        </div>
    )
}

export default ModalInput
