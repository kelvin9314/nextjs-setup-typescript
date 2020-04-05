import NextLink from "next/link";
import { useRouter } from 'next/router'
import { SimpleGrid, Text, Alert, Flex, Heading, Link } from "@chakra-ui/core";
import useSWR from 'swr'
import { GetServerSideProps, NextPage } from "next";
import fetch from "node-fetch";
import ErrorPage from 'next/error'

const fetcher = async(url: string) => {
  const res = await fetch(url)
  if(!res.ok)  throw Error('Something wrong about the Api');

  const data: {id: number; name: string; email: string;} = await res.json()

  return data

}

const UserData = () => {
  const router = useRouter()
  const { id, ...rest } = router.query
  const {data, error} = useSWR(`/api/user/${id}`, fetcher)

  if(error){
    return <Alert marginY={4} status="error"> Loading failed: {error.message}</Alert>
  }

  if(!data) {
    return <Alert marginY={4} status="info">Loading...</Alert>
  }

  return (
    <SimpleGrid columns={2} width="2xs" spacingY={4} marginY={4} >
      <Text fontSize="bold" marginRight={4}>
        UserID
      </Text>
      <Text>{data.id}</Text>

      <Text fontSize="bold" marginRight={4}>
        Name
      </Text>
      <Text>{data.name}</Text>
      <Text fontSize="bold" marginRight={4}>
        Email
      </Text>
      <Text>{data.email}</Text>

    </SimpleGrid>
  )
}

const UserPage: NextPage<{data} > = ({ data }) => {
  // const router = useRouter()
  // const { id, ...rest } = router.query

  if(!data){
    return <ErrorPage statusCode={404}></ErrorPage>
  }

  return (
    <Flex flexDirection="column" alignItems="center" margin={4}>
      <Heading as="h1" size="2xl" marginY="2rem">
        USER
      </Heading>
      {/* <UserData /> */}
      <SimpleGrid columns={2} width="2xs" spacingY={4} marginY={4} >
      <Text fontSize="bold" marginRight={4}>
        UserID
      </Text>
      <Text>{data.id}</Text>

      <Text fontSize="bold" marginRight={4}>
        Name
      </Text>
      <Text>{data.name}</Text>
      <Text fontSize="bold" marginRight={4}>
        Email
      </Text>
      <Text>{data.email}</Text>

    </SimpleGrid>
      <NextLink href="/" passHref>
        <Link>Go back home </Link>
      </NextLink>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async({params, res}) => {
  try {
    const {id} = params
    const result = await fetch(`http://localhost:3000/api/user/${id}`)
    const data = await result.json()

    return {
      props: { data }
    }
  } catch(err) {
    console.log(err)
    res.statusCode = 404
    return {
      props: {}
    }
  }

}

export default UserPage
