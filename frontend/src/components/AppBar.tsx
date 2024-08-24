
export function AppBar() {
    return (
        <div className="h-15 w-full flex justify-between items-center p-4 bg-black text-white">
            <div className="font-extrabold text-2xl">
                zapier
            </div>
            <div className="flex items-center gap-4">
                <button>
                    login
                </button>
                <button>
                    Sign up
                </button>
            </div>
        </div>
    )
}