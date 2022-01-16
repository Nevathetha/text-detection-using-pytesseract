import React from 'react'

function TextList(props) {
  console.log("textlist is importedm too");
  console.log(props);
    return (
        <div>
            <p>
                <span style={{ fontWeight: 'bold, underline' }}>{props.data} </span>
                <hr></hr>
            </p>
        </div>
    )
}

export default TextList;