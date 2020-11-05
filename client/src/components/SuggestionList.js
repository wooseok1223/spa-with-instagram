import React from 'react'
import {Card} from "antd";
import Suggestion from "./Suggestion";

export default function SuggestionList({style}) {
    return (
        <div style={style}>
            <Card title="Stories" size="small">
                <Suggestion/>
                <Suggestion/>
                <Suggestion/>
                <Suggestion/>
                <Suggestion/>
            </Card>
        </div>
    )
}