"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Url } from "../lib/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fileToBase64 } from "@/lib/fileToBase64";

interface initialDataType {
  skills?: string
  about?: string
  githubUrl?: string
  linkdinUrl?: string
  resume?: string
}

export default function ProfileDetailInfo() {
  const skillsRef = useRef<HTMLTextAreaElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const [degree, setDegree] = useState("Btech");
  const resumeRef = useRef<HTMLInputElement>(null);


  const [initialData, setInitialData] = useState<initialDataType>();


  const [dataExists, setDataExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You're not logged in");
      router.push(`${Url}/auth/login`);
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${Url}/api/function/profileDetailInfo`, {
          withCredentials: true,
        });

        const data = res?.data?.data;
        console.log("data", data);
        if (data) {
          setInitialData({
            skills: data.skills || "",
            about: data.about || "",
            githubUrl: data.githubUrl || "",
            linkdinUrl: data.linkdinUrl || "",
            resume: data.resume || "",
          })
          setDegree(data.highestDegree);
          setDataExists(true);
        }
      } catch (err) {
        setDataExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const pdf = resumeRef.current?.files?.[0];
    const pdfBase64 = pdf ? await fileToBase64(pdf) : null;

    const payload = {
      skills: skillsRef.current?.value.trim() || "",
      about: aboutRef.current?.value.trim() || "",
      githubUrl: githubRef.current?.value.trim() || "",
      linkdinUrl: linkedinRef.current?.value.trim() || "",
      highestDegree: degree.trim() || "",
      pdfBase64,
      pdfType: pdf?.type || "",
    };



    try {
      if (dataExists) {
        if (!isEditable) {
          setIsEditable(true);
        } else {
          await axios.put(`${Url}/api/function/profileDetailInfo`, payload, {
            withCredentials: true,
          });
          console.log("payload", payload);
          toast.success("Profile updated successfully!");
          setIsEditable(false);
        }
      } else {
        await axios.post(`${Url}/api/function/profileDetailInfo`, payload, {
          withCredentials: true,
        });
        toast.success("Profile created successfully!");
        setDataExists(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="h-screen w-screen">
    <div className="space-y-4 grid md:grid-cols-2 md:gap-4 h-full w-full ">
      <div className="w-full">
        <Label>skills</Label>
        <Textarea
          defaultValue={initialData?.skills}
          ref={skillsRef}
          placeholder="skills"
          className="w-full"
          disabled={!isEditable} />
      </div>
      <div>
        <Label>About</Label>
        <Textarea
          ref={aboutRef}
          defaultValue={initialData?.about}
          placeholder="About"
          disabled={!isEditable}
          className={` ${!isEditable ? "text-black " : "text-gray-400"}`}
        />
      </div>
      <div>
        <Label>Github Url</Label>
        <Input
          defaultValue={initialData?.githubUrl}
          ref={githubRef}
          placeholder="GitHub URL"
          disabled={!isEditable}
        />
      </div>
      <div>
        <Label>linkdin Url</Label>
        <Input
          defaultValue={initialData?.linkdinUrl}
          ref={linkedinRef}
          placeholder="LinkedIn URL"
          disabled={!isEditable}
        />
      </div>
      <div>
        <Label>highestDegree</Label>
        <Select
          value={degree}
          onValueChange={setDegree}
          disabled={!isEditable}
        >

          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select degree" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Btech">Btech</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
            <SelectItem value="12th">12th</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>resume upload</Label>
        <Input

          type="file"
          accept=".pdf"
          ref={resumeRef}
          placeholder="Resume URL"
          disabled={!isEditable}
        />

      </div>
      <div className="">
        <Button className="" onClick={handleSubmit}>
          {!dataExists ? "Submit Info" : isEditable ? "Save" : "Update Info"}
        </Button>
      </div>
      <div className="h-80 w-150">
      {initialData?.resume && (
        <div className="mt-4 ">
          <p className="font-semibold">PDF Preview:</p>
          <iframe
            // src={`https://docs.google.com/gview?url=${data.pdfUrl}&embedded=true`}
            src={`https://docs.google.com/gview?url=${initialData.resume}&embedded=true`}
            style={{
              width: "250px",
              height: "300px",
              border: 'none',
              borderRadius: '12px'
            }}
          ></iframe>

          <p className="text-sm text-gray-600 mt-1">
            Or{" "}
            <a
              href={initialData.resume}
              download
              className="text-gray-400 hover:text-blue-600 underline"
            >
              Click here to download

            </a>.
          </p>
        </div>
      )}
      </div>
    </div>
    </div>

  );
}
