import React, { useCallback, useState } from "react";
import { Tabs } from 'antd';
import TabList from "./List";
import TabDetail from "./Detail";
import TabHistory from "./History";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { chooseAsset, clearAsset } from "../../actions/action";

const { TabPane } = Tabs;

export default function Asset() {
    const [activeTab, setActiveTab] = useState("1");
    const assetState = useSelector(state => state.assetReducer);
    const dispatch = useDispatch();
    const { chosenAsset } = assetState;

    const handleChooseAsset = useCallback((code) => {
        dispatch(chooseAsset(code));
        setActiveTab("2");
    }, [dispatch])

    const handleBackList = useCallback(() => {
        dispatch(clearAsset());
    }, [dispatch])

    const handleChangeTab = (key) => {
        setActiveTab(key)
        if (key === '1') {
            handleBackList();
        }
    }

    return (
        <div className="asset">
            <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleChangeTab} style={{ marginLeft: '20px' }}>
                <TabPane tab="List" key="1">
                    <TabList onChooseAsset={handleChooseAsset} />
                </TabPane>
                {
                    chosenAsset && chosenAsset.length > 0 &&
                    <>
                        <TabPane tab="Detail" key="2">
                            <TabDetail />
                        </TabPane>
                        <TabPane tab="History" key="3">
                            <TabHistory />
                        </TabPane>
                    </>
                }
            </Tabs>
        </div>
    );
}


