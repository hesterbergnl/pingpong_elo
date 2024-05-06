import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/loginUserReducer'

const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleLogout = async (event) => {
        event.preventDefault()

        dispatch(clearUser())
    }
    return (
        <button onClick={handleLogout}>Log Out</button>
    )
}

export default LogoutButton