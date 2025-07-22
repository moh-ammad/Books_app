import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartUpCard, { StartupTypeCard } from "./startupcard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  console.log(JSON.parse(JSON.stringify(startups[0], null, 2)));
  return (
    <>
      {
      startups.length > 0 ? 
      (
        startups.map((startup)=>(
          <StartUpCard key={startup._id} post={startup as StartupTypeCard} />
        ))
      ) 
      : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserStartups;