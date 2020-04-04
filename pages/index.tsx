import { NextPage } from "next";
import Link from "next/link";

const IndexPage: NextPage = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <Link href="/about"> Go to about page </Link>
    </div>

  )
}

export default IndexPage
