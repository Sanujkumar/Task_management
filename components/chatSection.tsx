"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import axios from "axios";
import { Avatar,AvatarFallback,AvatarImage } from "./ui/avatar";

interface Props {
  userId: number;
  receiverId: number;
  user: {
    name: string,
    image: string
  }
}

export default function ChatBox({ userId, receiverId, user }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const roomId = [userId, receiverId].sort((a, b) => a - b).join("-");


  useEffect(() => {
    axios
      .get(`/api/function/history/${userId}/${receiverId}`)
      .then((res) => setMessages(res.data));

    const channel = pusherClient.subscribe(`chat-${roomId}`);
    channel.bind("new-message", (message: any) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    return () => {
      pusherClient.unsubscribe(`chat-${roomId}`);
    };
  }, [userId, receiverId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await axios.post("/api/function/send", { senderId: userId, receiverId, content: input });
    setInput("");
  };  

  return (
    <div className="p-5  mx-auto outline-2 m-4 space-y-2 ">
      <div className="flex space-x-4 ">
        <Avatar className="w-12 h-12 border-2 border-black">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>  
        <p>{user.name}</p>
      </div>
      <div className="h-125 overflow-y-auto border rounded p-2 bg-white mb-2 outline-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`my-2 ${msg.senderId === userId ? "text-right" : "text-left"}`}>
            <div className="inline-block bg-blue-100 px-3 py-2 rounded">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 ">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded outline"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}


