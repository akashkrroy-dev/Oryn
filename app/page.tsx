"use client"

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {

  const { data } = useSession()
  console.log(data)

  return (
    <div className='font-helvetica'>hello world</div>
  );
}

