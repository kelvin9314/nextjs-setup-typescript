import NextLink from "next/link";
import axios from "axios";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Heading, Flex, Link, Text } from "@chakra-ui/core";

// TODO test for todo tag
const SingPostPage: NextPage<{post: {
  userId: number;
  id: number;
  title: string;
  body: string;
}}> = ({post}) => {
  console.log(post)
  return(
    <Flex margin={4} flexDirection="column">
      <NextLink href="/post" passHref>
        <Link>Back To Post </Link>
      </NextLink>
      <Heading as="h1" size="xl" marginY={4}>
        {post.title}
      </Heading>
      <Text> Post Id: {post.id} </Text>
      <Text> User Id: {post.userId}  </Text>
      <Text> Content Body: {post.body} </Text>
    </Flex>
  )
}

// FIXME test for bug tag
// Static Side Generation (SSG)
export const getStaticPaths: GetStaticPaths = async() => {
  const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: false }
}

// DONE test for DONE tag
// Static Side Generation (SSG)
export const getStaticProps: GetStaticProps = async({ params, preview, previewData }) => {
  const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  // Call an external API endpoint to get posts.
  const { data: post } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)

  // By returning { props: posts }, the Todo component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  }
}

// NOTE test for note tag
export default SingPostPage
