import React from 'react'
import Header from '../Header';

export default function LayoutWrapper(props) {
    const { component, getProps } = props;
    const Content = component;
    return (
        <div>
            <Header />
            <Content {...getProps} />
        </div>
    )
}
