import { Highlights } from "./Highlights";

export function HeroSection() {
    return (
        <div className="min-h-screen mt-10">
            <div className="flex flex-col items-center">
                <div className="text-6xl font-bold">
                    Automate as fast as you can type
                </div>
                <div className="">
                    AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
                </div>
                <div className="flex items-center gap-4">
                    <button>
                        start free with email
                    </button>
                    <button>
                        start free with google
                    </button>
                </div>
                <div className="flex gap-4">
                    <Highlights title="free forever" desc="for core features"/>
                    <Highlights title="More apps" desc="for core features"/>
                    <Highlights title="Cutting-edge" desc="AI features"/>
                </div>
            </div>
        </div>
    )
}