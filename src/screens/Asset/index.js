import React, { useCallback, useEffect } from "react";
import TabList from "./List";
import TabDetail from "./Detail";
import TabHistory from "./History";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { chooseAsset, clearAsset, setGroups, setManufacturers, setSites, setSuppliers, setTypes, setStatus } from "../../actions/action";
import axiosService from '../../utils/axiosService';
import { ENDPOINT, API_TYPE, API_GROUP, API_SUPPLIER, API_SITE, API_MANUFACTURER, API_STATUS } from "../../constants/api";
import { Switch, Route, useHistory, NavLink } from "react-router-dom";

export default function Asset() {
    const history = useHistory();
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
            const status = await axiosService.get(`${ENDPOINT}${API_STATUS}`);
            dispatch(setStatus(status))
        }
        fetchData();
    }, [dispatch]);

    const handleChooseAsset = useCallback((code) => {
        dispatch(chooseAsset(code));
        history.push(`/assets/detail/${code}`)
    }, [dispatch])

    const handleBackList = useCallback(() => {
        dispatch(clearAsset());
    }, [dispatch])
    return (
        <div className="asset">
            <ul className="navBar">
                <li>
                    <NavLink exact className="navBar__item" to="/assets" activeClassName="navBar__item-active">List</NavLink>
                </li>
                {
                    (chosenAsset?.length > 0) &&
                    <>
                        <li >
                            <NavLink className="navBar__item" to={`/assets/detail/${chosenAsset}`} activeClassName="navBar__item-active">Detail</NavLink>
                        </li>
                        <li >
                            <NavLink className="navBar__item" to={`/assets/history/${chosenAsset}`} activeClassName="navBar__item-active">History</NavLink>
                        </li>
                    </>
                }
            </ul>
            <div className="contentWrapper">
                <Switch>
                    <Route exact path="/assets">
                        <TabList onChooseAsset={handleChooseAsset} onClearChosen={handleBackList} />
                    </Route>
                    <Route path="/assets/detail/:id">
                        <TabDetail />
                    </Route>
                    <Route path="/assets/history/:id">
                        <TabHistory />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}


