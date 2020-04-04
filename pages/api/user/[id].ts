import { NextApiHandler } from "next";
import data from '../../../config/data.json'

const user:NextApiHandler = (req, res) =>{
  const { id } = req.query
  const userData = data.find(x => x.id.toString() === id.toString() )

  if(userData) res.status(200).json(userData)

  res.status(404).send('user not found')

}

export default user
