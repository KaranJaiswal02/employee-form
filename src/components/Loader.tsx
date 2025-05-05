import React from 'react'

export default function Loader({loaderClass = "md:w-36 w-16 md:h-36 h-16"}: {loaderClass?: string}) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <span className={`inline-block border-[1rem] border-gray-600 border-b-transparent rounded-full animate-spin dark:border-white dark:border-b-transparent ${loaderClass}`}></span>
        </div>
    )
}
