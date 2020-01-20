import styles from './index.sass'
import RoomForm from '../components/home/room'
import NicknameForm from '../components/home/nickname'

export default ({ nickname, setNickname, connected, ws }) => {
    return <>
        <div className={ styles.home }>
            <h1>apple's cards</h1>

            { connected || nickname === false 
                ? nickname 
                    ? <RoomForm { ...{styles, ws, nickname, setNickname} } />
                    : <NicknameForm { ...{nickname, setNickname} } />
                : <div>loading..</div> 
            }
        </div>
    </>
}