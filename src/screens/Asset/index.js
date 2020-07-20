import React, { useCallback, useState, useEffect } from "react";
import { Tabs } from 'antd';
import TabList from "./List";
import TabDetail from "./Detail";
import TabHistory from "./History";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { chooseAsset, clearAsset, setGroups, setManufacturers, setSites, setSuppliers, setTypes } from "../../actions/action";
import axiosService from '../../utils/axiosService';
import { ENDPOINT, API_TYPE, API_GROUP, API_SUPPLIER, API_SITE, API_MANUFACTURER } from "../../constants/api";

const { TabPane } = Tabs;

export default function Asset() {
    const [activeTab, setActiveTab] = useState("1");
    const assetState = useSelector(state => state.assetReducer);
    const dispatch = useDispatch();
    const { chosenAsset } = assetState;

    //componentDidMount
    useEffect(() => {
        const fetchData = async () => {
            const types = await axiosService.get(`${ENDPOINT}${API_TYPE}`);
            dispatch(setTypes(types))
            const groups = await axiosService.get(`${ENDPOINT}${API_GROUP}`);
            dispatch(setGroups(groups))
            const manufacturer = await axiosService.get(`${ENDPOINT}${API_MANUFACTURER}`);
            dispatch(setManufacturers(manufacturer))
            const sites = await axiosService.get(`${ENDPOINT}${API_SITE}`);
            dispatch(setSites(sites))
            const suppliers = await axiosService.get(`${ENDPOINT}${API_SUPPLIER}`);
            dispatch(setSuppliers(suppliers))
        }
        fetchData();
    }, [dispatch]);

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


