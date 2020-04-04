import { useRouter } from 'next/router'

const User = () => {
  const router = useRouter()
  const { id, ...rest } = router.query

  return (
    <div>
      <h2>User Id={id}  </h2>
      <pre>{JSON.stringify(rest)}</pre>
    </div>
  )
}

export default User
