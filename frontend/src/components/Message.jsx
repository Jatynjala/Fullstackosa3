const Message = ({ message, mesClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={mesClass}>
      {message}
    </div>
  )
}

export default Message