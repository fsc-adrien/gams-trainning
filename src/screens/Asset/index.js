import React, { useCallback } from "react";
import { Tabs, Button } from 'antd';
import TabList from "./List";
import TabDetail from "./Detail";
import TabHistory from "./History";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { chooseAsset, clearAsset } from "../../actions/action";

const { TabPane } = Tabs;

export default function Asset() {
    const assetState = useSelector(state => state.assetReducer);
    const dispatch = useDispatch();
    const { chosenAsset } = assetState;

    const handleChooseAsset = useCallback((code) => {
        dispatch(chooseAsset(code));
    }, [dispatch])

    const handleBackList = useCallback(() => {
        dispatch(clearAsset());
    }, [dispatch])

    const handleChangeTab = (key) => {
        if (key === '1') {
            handleBackList();
        }
    }

    return (
        <div className="asset">
            <Button onClick={() => handleChooseAsset("code")}>Click</Button>
            <Tabs defaultActiveKey="1" onChange={handleChangeTab} style={{ marginLeft: '20px' }}>
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


