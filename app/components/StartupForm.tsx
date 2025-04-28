"use client";
import React, { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";

import { title } from "process";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// import { useActionState } from "react";
const StartupForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: formData.get("pitch") as string,
      };

      await formSchema.parseAsync(formValues);
      setErrors({});
      console.log("Form values:", formValues);

      // if (result.status == "SUCCESS") {
      //   toast("Success", {
      //     description: "Your startup has been submitted successfully",
      //     variant: "default",
      //   });
      // }
      // console.log(formValues);
      // router.push(`/startup/${result.id}`);
      // return result;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [
              key,
              value?.[0] || "",
            ])
          )
        );
      } else {
        console.error("Unexpected error:", error);
      }
      // TODO: Replace with a valid notification method, e.g., using Toaster or another toast library
      toast("error", {
        description: "Some error while submitting your startup",
        className: "bg-red text-white",
      });
    } finally {
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    errors: "",
    status: "INITIAL",
  });
  return (
    <form action={formAction} className="startup-form">
      <div className="flex flex-col ">
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="startup-form_input"
          placeholder="Enter your startup title"
          required
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div className="flex flex-col ">
        <label htmlFor="description" className="startup-form_label">
          Title
        </label>
        <input
          // type="text"
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Enter your startup description"
          required
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col ">
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <input
          id="category"
          name="category"
          className="startup-form_input"
          placeholder="Enter your startup category(e.g. Tech, Web3, etc.)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col ">
        <label htmlFor="link" className="startup-form_label">
          Image url
        </label>
        <input
          type="text"
          id="link"
          name="link"
          className="startup-form_input"
          placeholder="Enter your startup image URL"
          required
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div className="flex flex-col" data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          pitch
        </label>
        <MDEditor
          id="pitch"
          value={pitch}
          onChange={(value) => setPitch(value || "")}
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          className="startup-form_textarea"
          textareaProps={{
            placeholder: "Enter your startup pitch",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <Button type="submit" className="startup-form_btn" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Startup"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
