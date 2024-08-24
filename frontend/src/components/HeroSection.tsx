import { Highlights } from "./Highlights";

export function HeroSection() {
    return (
        <div className="h-[55vh] ">
            <div className="flex flex-col items-center gap-8">
                <div className="w-3/4 text-center text-6xl font-bold">
                    Automate as fast as you can type
                </div>
                <div className="w-3/4 text-center text-neutral-300">
                    AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-slate-900 h-12 p-2 rounded-lg">
                        start free with email
                    </button>
                    <button className="bg-orange-600 h-12 p-2 rounded-lg">
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