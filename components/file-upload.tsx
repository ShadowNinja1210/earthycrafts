"use client";

import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function FileUpload({ onChange, value }: { onChange: (url?: string) => void; value: string }) {
  const deleteFile = async (url: string) => {
    try {
      const key = url.split("/").pop();
      const res = await fetch(`/api/uploadthing/${key}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onChange("");
      }
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  return (
    <>
      {value && (
        <div className="flex flex-wrap gap-2">
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative h-24 w-20">
                <Image src={value} fill alt="Design" className={cn("rounded-lg object-contain cursor-pointer")} />
                <button
                  className={cn(" absolute top-0 right-0 p-0.5 bg-red-500 rounded-full text-white ")}
                  type="button"
                  onClick={() => deleteFile(value)}
                >
                  <X size={18} />{" "}
                </button>
              </div>
            </HoverCardTrigger>

            <HoverCardContent>
              <Image src={value} alt={"Uploaded Image for the Gallery"} width={400} height={400} />
            </HoverCardContent>
          </HoverCard>
        </div>
      )}

      <UploadDropzone
        className="cursor-pointer"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onChange(res[0]?.url);
        }}
        onUploadError={(error: Error) => {
          console.error(error);
        }}
      />
    </>
  );
}
