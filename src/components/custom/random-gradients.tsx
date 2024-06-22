import {
  Card,
  Skeleton,
  useToast,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  CopyGradient,
  DialogDescription,
} from "@/components";
import { colorGradientType } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const RandomGradients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gradients, setGradients] = useState<colorGradientType[]>([]);
  const { toast } = useToast();

  // get random color from API
  const getRandomGradients = useCallback(async () => {
    await axios
      .get("/random/12")
      .then((res) => {
        setGradients(res.data?.colors as colorGradientType[]);
      })
      .catch(() => {
        toast({
          title: "Something went wrong.",
          description: new Date().toLocaleTimeString(),
          className: "bg-red-500 text-white",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [toast]);

  useEffect(() => {
    getRandomGradients();
  }, [getRandomGradients]);
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {/*  if loading , show skeletons */}
      {isLoading &&
        Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full bg-gray-200" />
        ))}

      {/* if loading is completed , show Color cads */}
      {!isLoading &&
        gradients.map((gradient, i) => (
          <Dialog key={i}>
            <DialogTrigger>
              <Card
                key={i}
                className="h-32 w-full"
                style={{
                  background: `linear-gradient(to bottom, ${gradient.start}, ${gradient.end})`,
                }}
              />
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Copy Gradient Colors</DialogTitle>
                <DialogDescription>
                  Copy the gradient color code in CSS and Tailwind CSS format.
                </DialogDescription>
              </DialogHeader>
              <CopyGradient gradient={gradient} isLinear />
            </DialogContent>
          </Dialog>
        ))}
    </div>
  );
};
