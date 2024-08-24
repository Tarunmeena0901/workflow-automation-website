import { FaCheck } from "react-icons/fa"

export function Highlights({
    title,
    desc
} : {
    title: string,
    desc: string
}){
    return (
        <span className="text-sm">
            <FaCheck/> <b>{title}</b> {desc}
        </span>
    )
}