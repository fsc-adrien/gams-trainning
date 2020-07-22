import React, { Component } from 'react';
import {List, Typography, Divider, Drawer, Button, Form, Input, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable'; // The default
import "./List.scss";

const data = [
    'Nguyen Van A',
    'Pham Duc B',
    'Dinh Cong Manh',
    'Dinh Anh Duc',
  ];
  
let DraggableCore = Draggable.DraggableCore;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  
class Newpj extends Component {

    state = { visible: false, childrenDrawer: false };

        showDrawer = () => {
            this.setState({
            visible: true,
            });
        };

        onClose = () => {
            this.setState({
            visible: false,
            });
        };

        showChildrenDrawer = () => {
            this.setState({
            childrenDrawer: true,
            });
        };

        onChildrenDrawerClose = () => {
            this.setState({
            childrenDrawer: false,
            });
        };
        
        
        
    render() {
        return (
            <div>
                <>
                <Button type="primary" style={{
                        marginLeft: '50px', 
                        marginTop : '20px',
                    }} onClick={this.showDrawer}>
                Open drawer
                </Button>
                <Drawer
                title="Multi-level drawer"
                width={520}
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
                
                >
                    <Row>
                    <Col bordered span={12}>
                        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} >
                        <Form.List name="names">
                            {(fields, { add, remove }) => {
                            return (
                                <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Users' : ''}
                                    required={false}
                                    key={field.key}
                                    >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                        ]}
                                        noStyle
                                    >
                                        <Draggable>
                                        <Input  placeholder="John" style={{ width: '60%', marginLeft: '20px' }} />
                                        </Draggable>

                                    
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        style={{ margin: '0 8px' }}
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                        />
                                    ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '70%',
                                    marginLeft: '20px' }}
                                    >
                                    <PlusOutlined /> Add field
                                    </Button>
                                </Form.Item>
                                </div>
                            );
                            }}
                        </Form.List>
                    
                    <Form.Item>
                        {/* <Button  style={{
                            marginLeft: '20px'
                        }} type="primary" htmlType="submit"
                        >
                        Submit
                        </Button> */}
                    </Form.Item>
                    </Form>
                    
                    </Col>
                    <Col className="text-center" span={12}>
                    <List
                    size="small"
                    header={<div>User List</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    />
                    </Col>
                    </Row>
                 
                </Drawer>
                
            </>
            </div>
        );
    }
}

export default Newpj;