import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = ({link}) => {
  return (
<div class="grid h-screen place-content-center bg-white px-4">
  <h1 class="uppercase tracking-widest text-gray-500">404 | Unauthorized</h1>
  <Link to={`/${link}/signin`} class="text-blue-500">  <h1 class="uppercase tracking-widest text-gray-500">Go back to Sign In</h1></Link>

  
</div>
  )
}

export default Unauthorized