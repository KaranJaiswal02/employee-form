"use client"
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'

export default function page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home')
  }, [])
  return (
    <div>

    </div>
  )
}
