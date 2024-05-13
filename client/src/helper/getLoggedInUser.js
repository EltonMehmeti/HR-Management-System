import React from 'react'
import Cookies from 'js-cookie'
const getLoggedInUser = () => {
    const user = Cookies.get('user')
  
    return user ? JSON.parse(user) : null
}

export default getLoggedInUser