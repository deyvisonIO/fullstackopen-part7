import { useSelector } from "react-redux"

function Notification() {
  const notification = useSelector(state => state.notification)

  if(!notification.content) return null

  return (
    <p className={`message ${notification.type}`}>
      {notification.content}
    </p>
  )
}

export default Notification
