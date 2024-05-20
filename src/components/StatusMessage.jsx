import { useSelector } from 'react-redux'

const StatusMessage = () => {
  const status = useSelector(state => state.statusMessage)

  if(status === null){
    return null
  }

  return (
    <div>
      {status.message}
    </div>
  )
}

export default StatusMessage