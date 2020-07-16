import React from 'react'
import { useSelector } from 'react-redux'

export default function TabDetail() {
    const assetState = useSelector(state => state.assetReducer);
    const { chosenAsset } = assetState;

    return (
        <div>
            <p>{chosenAsset}</p>
        </div>
    )
}
