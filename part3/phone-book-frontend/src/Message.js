

const NotificationMessage = ({message}) =>{
  const messageStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return <div style={messageStyle}>{message}</div>
}

const ErrorMessage = ({message}) =>{
    const messageStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return <div style={messageStyle}>{message}</div>
  }


export {
  NotificationMessage,
  ErrorMessage,
} 
