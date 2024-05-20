import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/loginUserReducer'
import { setStatusMessageState } from '../util/helpers'

import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedPongadminUser')
        setStatusMessageState(`User Logged Out!`, false)
        dispatch(clearUser())
        navigate('/')
    }
    return (
        <button onClick={handleLogout}>Log Out</button>
    )
}

export default LogoutButton