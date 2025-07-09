export default function LoadingIndicator({ msg = 'Loading...' }: { msg?: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-700 font-semibold">{msg}</p>
            </div>
        </div>
    )
}