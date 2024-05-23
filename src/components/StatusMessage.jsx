import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const StatusMessage = () => {
  const status = useSelector(state => state.statusMessage)
  var variant = 'success'

  if(status === null){
    return null
  }

  if(status.error === true) {
    variant = 'danger'
  }

  return (
    <Alert variant={variant}>
      {status.message}
    </Alert>
  )
}

export default StatusMessage