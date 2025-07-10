// app/create/page.tsx
import { auth } from "@/auth";
import  StartupForm  from "@/components/StartUpForm";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <section className="pink_container min-h[230px] pattern">
        <h1 className="heading">Submit Your Startup</h1>
      </section>
      <StartupForm/>
    </>
  );
}
