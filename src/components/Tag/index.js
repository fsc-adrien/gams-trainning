import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';

const TagWrapper = styled.div`
    width: 40px;
    font-weight: 900;
    color: white;
    text-align: center;
    background-color: ${props => props.color || 'gray'};
`

const Tag = ({ children, decs }) => {
    return (
        <TagWrapper>
            <Tooltip title={decs}>
                {children}
            </Tooltip>
        </TagWrapper>
    )
}
export default Tag;