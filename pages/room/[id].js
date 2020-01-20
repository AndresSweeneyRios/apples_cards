import { useRouter } from 'next/router'

export default () => {
    const router = useRouter()
  
    const room = {
        id: router.query.id
    }

    return (
        <h1>{room.id}</h1>
    )
  }