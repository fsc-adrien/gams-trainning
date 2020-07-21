import React from 'react'
import { Input } from 'antd'

export const SearchInput = ({
    label,
    name,
    onChange,
    placeholder,
    size,
    ...rest
}) => {
    return (
        <div className="searchInput" {...rest}>
            <p className="searchInput__label">{label}</p>
            <Input
                className="searchInput__input"
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                style={{ width: size === 'large' ? '250px' : size === 'medium' ? '180px' : '150px' }}
            />
        </div>
    )
}
