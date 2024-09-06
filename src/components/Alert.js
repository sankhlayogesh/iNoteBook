import React from 'react'

function Alert(props) {
  return (
    props.alert != null
    ?   <div class = {`alert alert-${props.alert.type}`} role="alert" style={{ marginTop: "55px" }}>
            {props.alert.msg}
         </div>
    : <></>

  )
}

export default Alert