"use client";

import { Copy, Server } from "lucide-react";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";

//INTERFACE FOR API ALERT COMPONENT

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

//MAPS FOR VARIANT AND TEXT

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

//API ALERT COMPONENT

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant,
}) => {
  //COPY TO CLIPBOARD FUNCTION
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route copied successfully.");
  };

  //RETURNING THE API ALERT COMPONENT
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className=" flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center mt-3 -mx-5 sm:-mx-0 justify-between w-full gap-x-2 ">
        {/* TRUNCATE IMPLEMENTED BUT NEED TO MAKE IT MOBILE RESPONSIVE  */}

        <code className="relative rounded-lg bg-muted truncate p-0 font-semibold sm:text-base text-sm sm:px-1 font-mono">
          {description}
        </code>
        <Button variant={"ghost"} onClick={onCopy} size={"icon"}>
          <Copy className="" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
