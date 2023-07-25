import { useState } from "react";
import { Button } from "@/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/ui/dialog";
import { Label } from "@/ui/components/ui/label";
import { Textarea } from "@/ui/components/ui/textarea";
import { Input } from "@/ui/components/ui/input";
import { LoginDialog } from "@/ui/components/login-dialog";
import { useGetMe } from "@/ui/hooks/use-get-me";
import { useUploadImage } from "@/ui/hooks/use-upload-image";
import { useCreateShout } from "@/ui/hooks/use-create-shout";
import { useCreateShoutReply } from "@/ui/hooks/use-create-shout-reply";

interface ReplyFormElements extends HTMLFormControlsCollection {
  message: HTMLTextAreaElement;
  image: HTMLInputElement;
}

interface ReplyForm extends HTMLFormElement {
  readonly elements: ReplyFormElements;
}

interface ReplyDialogProps {
  children: React.ReactNode;
  shoutId: string;
}

export function ReplyDialog({ children, shoutId }: ReplyDialogProps) {
  const [open, setOpen] = useState(false);
  const me = useGetMe();
  const uploadImage = useUploadImage();
  const createShout = useCreateShout();
  const createShoutReply = useCreateShoutReply();

  if (me.isError || !me.data?.data) {
    return <LoginDialog>{children}</LoginDialog>;
  }

  async function handleSubmit(event: React.FormEvent<ReplyForm>) {
    event.preventDefault();
    const message = event.currentTarget.elements.message.value;
    const files = event.currentTarget.elements.image.files;
    const imageId = files?.length
      ? await uploadImage.mutateAsync(files[0])
      : undefined;
    const replyId = await createShout.mutateAsync({ message, imageId });
    await createShoutReply.mutateAsync({ shoutId, replyId });
    setOpen(false);
  }

  const isLoading =
    uploadImage.isLoading ||
    createShout.isLoading ||
    createShoutReply.isLoading;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shout out loud!</DialogTitle>
          <DialogDescription>
            Shout out your darkest thoughts to the world.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Label className="space-y-2">
              <span>Message *</span>
              <Textarea
                className="col-span-3"
                name="message"
                placeholder="Message"
                required
              />
            </Label>
            <Label className="space-y-2">
              <span>Image (optional)</span>
              <Input className="col-span-3" name="image" type="file" />
            </Label>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Shout out!
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
