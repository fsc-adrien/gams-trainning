import React from 'react'
import { useSelector } from 'react-redux';

export default function TabHistory() {
    const assetState = useSelector(state => state.assetReducer);
    const { chosenAsset } = assetState;

    return (
        <div className="history">
            <p>{chosenAsset}</p>
        </div>
    )
}
