import { LoaderIcon } from 'lucide-react'
import React, { ReactNode } from 'react'

const loading = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='w-full min-h-screen items-center justify-center flex'>
        <LoaderIcon width={24} height={24} className='animate-spin'/>
    </div>
  )
}

export default loading