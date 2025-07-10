"use client";

import { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ActionResponse } from "@/lib/types";
import { handleStartupForm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialState: ActionResponse = {
  success: false,
  message: "",
}

const StartupForm = () => {
   const router = useRouter();
  const [value, setValue] = useState<string>("");
  const [state, formAction, isPending] = useActionState(handleStartupForm, initialState);

 useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setValue("");
      router.push(`/startup/${state?.startupId}`);
    } else if (state?.errors) {
      toast.error(state.message);
    }
  }, [state]);


  
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          placeholder="Startup Title"
        required
        minLength={3}
        maxLength={20}
        />

        {state.errors?.title && <p className="startup-form_error">{
          state.errors.title[0]
        }</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Startup Description"
        required
        minLength={20}
        maxLength={200}
        />

        {state.errors?.description && (
          <p className="startup-form_error">{state.errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
          minLength={3}
          maxLength={20}
        />

        {state.errors?.category && (
          <p className="startup-form_error">{state.errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
          type="url"
        />

        {state.errors?.link && (
          <p className="startup-form_error">{state.errors.link}</p>
        )}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={value}
          onChange={(newValue) => setValue(newValue || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
            name: "pitch",
            minLength: 10,
            maxLength: 500,
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {state.errors?.pitch && (
          <p className="startup-form_error">{state.errors.pitch}</p>
        )}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;