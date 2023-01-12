import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className='bg-amber-50 flex flex-col gap-4 justify-center items-center h-screen'>
    <h1 className='text-8xl font-bold text-amber-500'>
    टिप्पणी
    </h1>
    <h2 className='text-xl font-semibold text-amber-400'>
      / Tippani /, Feedback Comments Made Easy.
    </h2>
    <h2 className='text-xl font-semibold text-amber-400'>
      Get Fast Feedback on your websites from live deployments.
    </h2>

   </div>
   <div className='bg-gray-100 h-screen border-red-400 border'>
    helleo

   </div>
    </>
  )
}

export default App
