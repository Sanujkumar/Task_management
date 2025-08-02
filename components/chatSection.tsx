"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";


interface Props {
  userId: number;
  receiverId: number;
  setRedDot: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    name: string,
    image: string
  }
}

export default function ChatBox({ userId, receiverId, user, setRedDot }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const roomId = [userId, receiverId].sort((a, b) => a - b).join("-");

  const getMessage = async () => {
    try {

      const res = await axios.get(`/api/function/history/${userId}/${receiverId}`);
      console.log(res.data);
      setMessages(res.data);
      setLoading(true);
    }
    catch (err) {
      console.log(err);
    }
  }

  type Message = {
    id: number;
    senderId: number;
    content: string;
    createdAt: string;
  };

  useEffect(() => {
    getMessage();

    const channel = pusherClient.subscribe(`chat-${roomId}`);
    channel.bind("new-message", (message: Message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === message.id)) return prev;
        return [...prev, message];

      });
      if (message.senderId !== userId) {
        setRedDot(true);
      }
    });

    return () => {
      pusherClient.unsubscribe(`chat-${roomId}`);
    };
  }, [userId, receiverId]);



  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoader(true);
    await axios.post("/api/function/send", { senderId: userId, receiverId, content: input }, { withCredentials: true });
    setLoader(false);
    setInput("");
  };



  return (
    <div className="p-1 mx-auto space-y-2 ">
      <div className="flex space-x-4 bg-white boder-2  rounded-4xl ">
        <Avatar className="w-12 h-12 border-2 border-green-400">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <p className="mt-2">{user.name}</p>
      </div>
      <div className="h-133 overflow-y-auto border rounded p-2 bg-white mb-2 outline-2">

        {messages.map((msg) => (
          <div key={msg.id} className={`my-2 ${msg.senderId === userId ? "text-right" : "text-left"}`}>
            <div className="inline-block bg-gray-700 text-white px-3 py-2 rounded">{msg.content}</div>
            <div>
              <small>
                {new Date(msg.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </small>
              <small>
                <p className="">
                  {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </p>
              </small>
            </div>

          </div>
        ))}
      </div>
      <div className="flex gap-2 ">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)

          }
          className="flex-1 p-2 border rounded-4xl outline"
          placeholder="Type a message..."
        />
        <Button
          disabled={loader}
          onClick={sendMessage}  
          variant="secondary"
          className="bg-white border-2 border-green-400 rounded-3xl cursor-pointer w-24"
        >
          {loader ? (
            <>
              <Loader2Icon className="animate-spin" />
            </>
          ) : (
            <>    
              Send
            </>
          )}
        </Button>
      </div>
    </div>
  );
}


