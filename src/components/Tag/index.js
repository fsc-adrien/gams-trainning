import styled from 'styled-components';

const Tag = styled.div`
    width: 40px;
    font-weight: 900;
    color: white;
    text-align: center;
    background-color: ${props => props.color || 'gray'};
`
export default Tag;