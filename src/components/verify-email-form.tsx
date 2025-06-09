import { GalleryVerticalEnd } from "lucide-react";

import type * as React from "react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export function VerifyEmailForm({
  className,
  action,
  ...props
}: React.ComponentProps<"div"> & { action: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form action={action} method="post">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Verify Your Email</h1>
            <div className="text-center text-sm">
              We've sent a one-time password (OTP) to your email address. Enter
              the code below to verify your identity.
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="otp">Enter your OTP</Label>
              <Input
                id="otp"
                type="text"
                name="code"
                placeholder="Enter your code"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
