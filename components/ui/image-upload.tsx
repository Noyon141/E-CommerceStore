"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="">
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            className="w-[200px] h-[200px] relative rounded-md overflow-hidden"
            key={url}
          >
            <div className="absolute z-10 top-2 right-2">
              <Button
                variant={"destructive"}
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image alt="image" fill className="object-cover" src={url} />
          </div>
        ))}
        {/* NEED TO GET FIXED LATER */}
        <CldUploadWidget uploadPreset="xeuds4nu" onUpload={onUpload}> 
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <Button
                variant={"secondary"}
                type="button"
                disabled={disabled}
                onClick={onClick}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Add an image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};
