import React, {useState} from "react"
import api from "../API"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState=>prevState.filter(user => user._id !== userId))
    }
    const renderPhrase = (number) => {
        if ((number % 10 === 2 && number < 10 || number > 20)
            || (number % 10 === 3 && number < 10 || number > 20)
            || (number % 10 === 4 && number < 10 || number > 20)) {
                return `${number} человека тусанет с тобой сегодня`
        } else if (number !== 0) {
            return `${number} человек тусанет с тобой сегодня`
        } else {
            return `Никто с тобой не тусанет`
        }
    }
    const renderPhraseStyle = (number) => {
        let styles = 'badge '
        styles += number === 0 ? 'bg-danger' : 'bg-primary'
        return styles
    }

    const renderQualityStyle = (color) => {
        let style = 'badge m-1 bg-'
        style += color
        return style
    }

    const renderUsers = () => {
        return users.map(user => (<tr key={user._id}>
            <th>{user.name}</th>
            <td>{user.qualities.map(quality => (<span key={quality._id} className={renderQualityStyle(quality.color)}>{quality.name}</span>))}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td><button 
                    className="btn btn-danger btn-sm m-2"
                    onClick={()=>handleDelete(user._id)}
                >
                    del
                </button>
            </td>
        </tr>))
    }

    return (
            <>
                <h1 className={renderPhraseStyle(users.length)}>{renderPhrase(users.length)}</h1>
                {users.length > 0 &&
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            renderUsers()
                        }
                    </tbody>
                </table>}
            </>
    )
}

export default Users