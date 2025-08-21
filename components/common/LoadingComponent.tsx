const LoadingComponent = () => {
    return <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
        <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse animation-delay-0"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse animation-delay-400"></div>
        </div>
    </div>

}

export default LoadingComponent;