import { ReactNode } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import Loader from "./Loader";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
  loading?: boolean;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
  loading,
}: MeetingModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex w-full max-w-[340px] sm:max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white"
        aria-describedby={undefined}
      >
        <div className="hidden">
          <DialogTitle />
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="modal image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            loading={loading}
            type="submit"
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button Icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
