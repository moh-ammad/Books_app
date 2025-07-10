// components/View.tsx
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { writeclient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { after } from "next/server";

interface StartupViewResult {
  _id: string;
  views?: number | null;
}

const View = async ({ id }: { id: string }) => {
  const data = await client
    .withConfig({ useCdn: false })
    .fetch<StartupViewResult | null>(STARTUP_VIEWS_QUERY, { id });

  if (!data) {
    // no document found – handle gracefully
    return <p>No startup found.</p>;
  }

  // ensure views is a non-null number
  const totalViews = (data.views ?? 0);

  after(async () => {
    await writeclient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
