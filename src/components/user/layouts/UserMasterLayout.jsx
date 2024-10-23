import React from 'react'
import UserHeader from './header/UserHeader'
import UserFooter from './footer/UserFooter'

const UserMasterLayout = ({child}) => {
  return (
    <>
    <UserHeader />
    {child}
    <UserFooter/>
    </>
  )
}

export default UserMasterLayout