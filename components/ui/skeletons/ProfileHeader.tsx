'use server'

export async function SkeletonProfileHeader() {
  return (
    <div className='bg-gray-100 p-8'>
      <div className='max-w-screen-xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
          <div className='flex items-center mb-4 sm:mb-0'>
            <div className='bg-gray-300 rounded-full h-24 w-24 animate-pulse'></div>
            <div className='ml-6'>
              <div className='bg-gray-300 h-6 w-48 mb-2 rounded animate-pulse'></div>
              <div className='bg-gray-300 h-4 w-32 mb-2 rounded animate-pulse'></div>
              <div className='bg-gray-300 h-6 w-20 rounded animate-pulse'></div>
            </div>
          </div>
          <div>
            <div className='flex flex-col sm:flex-row sm:space-x-4'>
              <div className='flex flex-wrap gap-2 mb-2 sm:mb-0'>
                <div className='bg-gray-300 h-6 w-32 rounded-lg animate-pulse'></div>
                <div className='bg-gray-300 h-6 w-20 rounded-lg animate-pulse'></div>
              </div>
              <div className='bg-gray-300 h-6 w-32 mt-1 sm:mt-0 rounded-lg animate-pulse'></div>
            </div>
            <div className='bg-gray-300 h-6 w-48 mt-2 rounded-lg animate-pulse'></div>
            <div className='bg-gray-300 h-6 w-48 mt-2 rounded-lg animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
