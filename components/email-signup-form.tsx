"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type FormValues = z.infer<typeof formSchema>;

export function EmailSignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Error parsing response:", jsonError);
        throw new Error("Server response was not valid JSON");
      }

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit email");
      }

      console.log("Email signup successful:", responseData.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      form.setError("email", {
        type: "server",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="p-4 text-center bg-primary/10 rounded-lg self-stretch">
        <p className="font-medium text-primary">Thank you for signing up!</p>
        <p className="text-muted-foreground">
          We&apos;ll notify you when we launch.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            {isSubmitting ? "Submitting..." : "Notify me"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
