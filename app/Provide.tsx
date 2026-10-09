"use client"

import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Provide = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession()


  useEffect(() => {
    data?.user?.email && createNewUser()
  }, [data])


  const createNewUser = async () => {
    const result = await axios.post('/api/user', {})
    console.log(result)
  }

  return (
    <div>{children}</div>
  )
}

export default Provide