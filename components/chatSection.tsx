

"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import axios from "axios";
import { Url } from "@/lib/config";

interface Props{
  userId: number,
  receiverId: number
}

// const userId = 4;
//   const partnerId = 16;   


export default function ChatBox({userId,receiverId}:Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const channelName = `chat-${[userId, receiverId].sort().join("-")}`;

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(`${Url}/api/function/history/${userId}/${receiverId}`);
      setMessages(res.data);
      console.log("message came",res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

 
  const setupPusher = () => {
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(channelName);
    };
  };

 
  useEffect(() => {
    fetchChatHistory();
    const cleanup = setupPusher();
    return cleanup;
  }, [userId, receiverId]);


 

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      await axios.post(`${Url}/api/function/send`, {  
        senderId: userId,
        receiverId: receiverId,
        content: input,
      });

      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };
        
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="h-64 overflow-y-auto border rounded p-2 bg-white mb-2">
        {messages.map((msg) => (
          <div
            key={`${msg.id}-${msg.createdAt}`}  
            className={`my-2 ${msg.senderId === userId ? "text-right" : "text-left"}`}
          >
            <div className="inline-block bg-blue-100 px-3 py-2 rounded">{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
