"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Notification() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const notificationData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notification",{
        withCredentials: true,
      });
      setData(res.data.notification);  
      console.log(res.data.notification);  
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }  
  };

  useEffect(() => {
    notificationData();   
  }, []);

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="bg-yellow-200 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {data.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item: any, index: number) => (
            <li key={index} className="bg-white p-2 rounded shadow">
              {item.message || JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
  