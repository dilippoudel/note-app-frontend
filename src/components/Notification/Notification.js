const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={message.error ? 'error' : 'success'}>
      <p>{message.error ? message.error : message.success}</p>
    </div>
  )
}
export default Notification
