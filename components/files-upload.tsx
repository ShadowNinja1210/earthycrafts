"use client";

import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function FilesUpload({
  onChange,
  value,
  main,
  setMainImg,
}: {
  onChange: (url?: string[], removeUrl?: string) => void;
  value: string[];
  main?: string | null;
  setMainImg?: (url: string) => void;
}) {
  const deleteFile = async (url: string) => {
    try {
      const key = url.split("/").pop();
      const res = await fetch(`/api/uploadthing/${key}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("File deleted successfully, changing state", value, url);
        onChange([], url);
      }
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  return (
    <>
      {value?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((image, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger>
                <div className="relative h-24 w-20">
                  <Image
                    src={image}
                    fill
                    alt="Design"
                    className={cn(
                      "rounded-lg object-contain cursor-pointer",
                      main === image ? "border-2 border-green-500 bg-green-500/60" : ""
                    )}
                    onClick={() => setMainImg && setMainImg(image)}
                  />
                  <button
                    className={cn(" absolute top-0 right-0 p-0.5 bg-red-500 rounded-full text-white ")}
                    type="button"
                    onClick={() => {
                      deleteFile(image);
                      onChange(value.filter((_, i) => i !== index));
                    }}
                  >
                    {" "}
                    <X size={18} />{" "}
                  </button>
                </div>
              </HoverCardTrigger>

              <HoverCardContent>
                <Image src={image} alt={"Uploaded Image" + index} width={400} height={400} />
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      )}

      <UploadDropzone
        className="cursor-pointer"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          res.map((r) => console.log(r.url));
          onChange(res.map((r) => r.url));
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </>
  );
}
