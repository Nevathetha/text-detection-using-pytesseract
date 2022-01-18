import TextList from './responseList'
import React from 'react';

export default function TextItem(props) {
    console.log("props", props);
    console.log("textitem is import");

    return (
        <div>
            <ul>
                {/* {props.text.map(content => <TextList data={content} />)} */}
                <TextList data={props.text.content} />
            </ul>
        </div>
    )
}