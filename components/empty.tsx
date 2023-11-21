import Image from "next/image"
import waiting from "../assets/waiting.svg"
const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full mt-10">
        <Image 
            src={waiting}
            alt="empty chat history"
            width={500}
            height={500}
            className=" w-80 h-80"
        />
        <p className=" text-muted-foreground">Chat is emtpy, send a message to see it appear here.</p>
    </div>
  )
}

export default Empty