import React, {Component} from "react";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {Input, Tooltip, Form} from "antd";

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Form>
                <Input
                    type="search"
                    name="search"
                    value={this.props.search}
                    onChange={this.props.onSearchChange}
                    onPressEnter={this.props.handleSearch}
                    style={{maxWidth: '350px', float: 'right', marginRight: '20px'}}
                    placeholder="Search for..."
                    prefix={<SearchOutlined className="site-form-item-icon"/>}
                    suffix={
                        <Tooltip title="Close">
                            <CloseOutlined style={{color: 'rgba(0,0,0,.45)'}} onClick={this.props.handleClose}/>
                        </Tooltip>
                    }
                />
            </Form>
        )
    }

}

export default SearchComponent;