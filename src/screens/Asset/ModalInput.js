import React from 'react'

const ModalInput = (props) => {
    const {
        label,
        required,
        name,
        type,
        onChange,
    } = props;
    return (
        <div className="input">
            <Col span={7}><p className="input__name">{label}{required && <span className='require-text'>*</span>}</p></Col>
            <Col span={17}>
                <TextArea
                    name={name}
                    rows={4}
                    onChange={onChange}
                />
            </Col>
        </div>
    )
}

export default ModalInput
