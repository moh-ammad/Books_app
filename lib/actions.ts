"use server"

import z from "zod";
import { ActionResponse, StartupFormProps } from "./types";
import { createPitch } from "./createpitch";

const StartUpSchema=z.object({
    title:z.string().min(3,"Title must be at least 3 characters long"),
    description:z.string().min(20,"Description must be at least 20 characters long"),
    category:z.string().min(3,"Category must be at least 3 characters long"),
    link:z.string().url("Image URL must be a valid URL").refine(async (url) => {
        try {
            const res = await fetch(url, { method: "HEAD" });
            const contentType = res.headers.get("content-type");
            return contentType?.startsWith("image/");
        } catch {
            return false;
        }
    }, "Image URL must point to a valid image"),
    pitch:z.string().min(10,"Pitch must be at least 10 characters long")
})

// export async function handleStartupForm(prevState:ActionResponse|null,
//     formData:FormData
// ):Promise<ActionResponse>{
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     try {
//         const formValues:StartupFormProps={
//             title: formData.get("title") as string,
//             description: formData.get("description") as string,
//             category: formData.get("category") as string,
//             link: formData.get("link") as string,
//             pitch: formData.get("pitch") as string,
//         }
//         const parsedData=await StartUpSchema.safeParseAsync(formValues);
//         const result=await createPitch(prevState,formData,formValues.pitch)
//         if(!parsedData.success){
//           showErrorToast("Please correct the errors in the form");
//             return{
//                 success:false,
//                 message:"Please correct the errors in the form",
//                 errors:parsedData.error?.flatten().fieldErrors
//             }
//         }
//         console.log("Form submitted successfully", parsedData.data);
//         showSuccessToast("Your startup pitch has been created successfully");
//         return {
//             success: true,
//             message: "Form submitted successfully",
//         }

//     } catch (error) {
//       showErrorToast("An unexpected error has occurred");
//         return{
//             success: false,
//             message: "An unexpected error has occurred",
//         }
//     }

// }
// actions.ts
export async function handleStartupForm(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const formValues: StartupFormProps = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: formData.get("link") as string,
      pitch: formData.get("pitch") as string,
    };

    const parsedData = await StartUpSchema.safeParseAsync(formValues);

    if (!parsedData.success) {
      return {
        success: false,
        message: "Please correct the errors in the form",
        errors: parsedData.error?.flatten().fieldErrors,
      };
    }

    // Call createPitch only if validation succeeded
    const result = await createPitch(prevState, formData, formValues.pitch);

    if (result.status === "ERROR") {
      return {
        success: false,
        message: "Failed to create the startup pitch",
      };
    }


    return {
      success: true,
      message: "Form submitted successfully",
      startupId: result._id, // pass back the new startup id here
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error has occurred",
    };
  }
}





