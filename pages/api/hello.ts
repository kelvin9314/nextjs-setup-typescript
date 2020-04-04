import { NextApiHandler } from "next";

const hello:NextApiHandler = (req, res) => {
  res.status(200).json({
    message: "hello, it's me"
  })
}

export default hello
