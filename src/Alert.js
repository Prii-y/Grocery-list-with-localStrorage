import React, { useEffect } from 'react'

const Alert = ({message,type}) => {
  return <h1 className={`alert alert-${type}`}>{message}</h1>
}

export default Alert
