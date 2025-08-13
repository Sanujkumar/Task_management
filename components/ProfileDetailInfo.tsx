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
import { Loader, Loader2Icon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { fileToBase64 } from "@/lib/fileToBase64";
import { userDetailInfoSchema } from "../lib/zod";

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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [skills, setSkills] = useState('');
  const [about, setAbout] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');


  //validation err code
  const validateField = (field: string, value: any) => {
    const singleFieldSchema = userDetailInfoSchema.shape[field as keyof typeof userDetailInfoSchema.shape];
    if (!singleFieldSchema) return;
    const result = singleFieldSchema.safeParse(value);

    setFormErrors((prev) => {
      const updated = { ...prev };
      if (!result.success) {
        updated[field] = result.error.errors[0].message;
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const [initialData, setInitialData] = useState<initialDataType>();


  const [dataExists, setDataExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
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

    const result = userDetailInfoSchema.safeParse(payload);

    if (!result.success) {
      const errorMap: Record<string, string> = {};
      const errors: any = result.error.format();
      for (const key in errors) {
        if (errors[key]?._errors?.[0]) {
          errorMap[key] = errors[key]._errors[0];
        }
      }
      setFormErrors(errorMap);
      toast.error("Validation failed!");
      return;
    } else {
      setFormErrors({});
    }



    try {
      if (dataExists) {
        if (!isEditable) {
          setIsEditable(true);
        } else {
          setLoader(true);
          await axios.put(`${Url}/api/function/profileDetailInfo`, payload, {
            withCredentials: true,
          });
          setLoader(false);
          console.log("payload", payload);
          toast.success("Profile updated successfully!");
          setIsEditable(false);
        }
      } else {
        setLoader(true);
        await axios.post(`${Url}/api/function/profileDetailInfo`, payload, {
          withCredentials: true,
        });
        setLoader(false);
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
    <div className="h-screen w-full p-4 md:p-8 overflow-x-hidden dark:bg-gray-500 rounded-3xl outline-2">
      <div className="w-full h-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="w-full">
            <Label className="text-black">skills</Label>
            <Textarea
              defaultValue={initialData?.skills}
              ref={skillsRef}
              placeholder="skills"
              className={`border p-2 border-gray-500 dark:border-white ${!isEditable ? "text-black " : "text-gray-400"}`}
              disabled={dataExists && !isEditable}
              onChange={(e) => {
                setSkills(e.target.value);
                validateField("skills", skills);
              }}
            />
            <p className="text-gray-400">{skills.length || 0} /200</p>
            {formErrors.skills && <p className="text-sm text-red-500">{formErrors.skills}</p>}
          </div>
          <div>
            <Label className="text-black">About</Label>
            <Textarea
              ref={aboutRef}
              defaultValue={initialData?.about}
              placeholder="About"
              disabled={dataExists && !isEditable}
              className={`border p-2 border-gray-500 dark:border-white ${!isEditable ? "text-black " : "text-gray-400"}`}
              onChange={(e) => {
                setAbout(e.target.value);
                validateField("about", about);
              }}
            />
            <p className="text-gray-400">{about.length || 0} /300</p>
            {formErrors.about && <p className="text-sm text-red-500">{formErrors.about}</p>}
          </div>
          <div>
            <Label className="text-black">Github Url</Label>
            <Input
              defaultValue={initialData?.githubUrl}
              ref={githubRef}
              placeholder="GitHub URL"
              className="border p-2  border-gray-500 dark:border-white"
              disabled={dataExists && !isEditable}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                validateField("githubUrl", githubUrl);
              }}
            />

            {formErrors.githubUrl && <p className="text-sm text-red-500">{formErrors.githubUrl}</p>}
          </div>
          <div>
            <Label className="text-black">linkdin Url</Label>
            <Input
              defaultValue={initialData?.linkdinUrl}
              ref={linkedinRef}
              placeholder="LinkedIn URL"
              className="border p-2 border-gray-500 dark:border-white "
              disabled={dataExists && !isEditable}
              onChange={(e) => {
                setLinkedinUrl(e.target.value);
                validateField("linkedinUrl", linkedinUrl);
              }}
            />

            {formErrors.linkedinUrl && <p className="text-sm text-red-500">{formErrors.linkedinUrl}</p>}
          </div>
          <div>
            <Label className="text-black">highestDegree</Label>
            <Select

              value={degree}
              onValueChange={setDegree}
              disabled={dataExists && !isEditable}
            >

              <SelectTrigger className="w-full border p-2 border-gray-500 dark:border-white ">
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent className="bg-gray-600 dark:text-black">
                <SelectItem value="Btech">Btech</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="12th">12th</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label >resume upload</Label>
            <Input
              type="file"
              accept=".pdf"
              ref={resumeRef}
              placeholder="Resume URL"
              className="border p-2 border-gray-500 dark:border-white "
              disabled={dataExists && !isEditable}
            />

          </div>
        </div>
        <div className=" ">
          <Button size="lg" variant='outline' className="rounded-3xl w-full border-2  bg-white" onClick={handleSubmit} disabled={loader}>
            {loader ? (
              <>
                <Loader2Icon className="animate-spin" />
                Please wait
              </>
            ) : (   
              !dataExists ? "Submit" : isEditable ? "Save" : "Edit"
            )
            }
          </Button>

        </div>


        <div className="h-80 w-full ">
          {initialData?.resume && (
            <div className="mt-4 ">
              <p className="font-semibold text-black">PDF Preview:</p>
              <iframe
                src={`https://docs.google.com/gview?url=${initialData.resume}&embedded=true`}
                style={{
                  width: "100%",
                  height: "400px",
                  padding: "2px",

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
