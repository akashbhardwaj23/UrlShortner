import React from 'react'
import { Button } from '@/components/ui/button';

function Error({handleErrorButton}: {handleErrorButton: () => void}) {
    return (
        <div className="flex flex-col mt-10 items-center h-full">
          <h1 className="text-7xl mb-14">Error</h1>
          <button className='border border-red-500 bg-red-500 text-white text-lg rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline' onClick={handleErrorButton}>Home Page</button>
        </div>
      );
}

export default Error