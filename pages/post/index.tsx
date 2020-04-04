import NextLink from "next/link";
import { Flex, Heading, Link, Box } from "@chakra-ui/core";
import { NextPage, GetStaticProps } from "next";
import axios from "axios";

const BlogIndexPage: NextPage<{posts: [
  {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
]}> = props => {
  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Heading marginY="2rem"> Table of Posts</Heading>
        {props.posts.map(post => (
          <NextLink
            as={`/post/${post.id}`}
            href={`/post/[id]`}
            passHref
            key={`/post/${post.id}`}
          >
            <Link>
              <Heading as="h3" size="lg">
                {`${post.id}: ${post.title}`}
              </Heading>
            </Link>
        </NextLink>
        ))}
      </Flex>
    </Box>
  )
}

// Static Side Generation (SSG)
export const getStaticProps: GetStaticProps = async () => {
  const { data:posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return {
    props: { posts }
  }
}

export default BlogIndexPage
