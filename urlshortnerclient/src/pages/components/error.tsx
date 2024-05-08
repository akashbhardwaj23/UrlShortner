import React from 'react'
import { Button } from '@/components/ui/button';

function Error({handleErrorButton}: {handleErrorButton: () => void}) {

    
    return (
        <div className="flex flex-col mt-10 items-center h-full">
          <h1 className="text-7xl mb-14">Error</h1>
          {/* <button
            className="p-4 bg-green-600 rounded-md text-xl font-semibold"
            onClick={handleErrorButton}
          >
            Go to Url Page
          </button> */}
          <Button variant={"destructive"} size={"lg"} className='text-xl font-semibold' onClick={handleErrorButton}> Go to Home Page</Button>
        </div>
      );
}

export default Error