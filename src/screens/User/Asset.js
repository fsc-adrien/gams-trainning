import React from "react";
import { Tabs } from 'antd';
import TabList from "./TabList";
import TabDetail from "./TabDetail";
import TabHistory from "./TabHistory";

function callback(key) {
    console.log(key);
}
const { TabPane } = Tabs;


class Asset extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="List" key="1">
                        <TabList />
                    </TabPane>
                    <TabPane tab="Detail" key="2">
                        <TabDetail/>
                    </TabPane>
                    <TabPane tab="History" key="3">
                        <TabHistory/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Asset;