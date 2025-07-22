import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartUpCard, { StartupTypeCard } from "@/components/startupcard";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

interface searchParams {
  query?: string;
}

export default async function Home(
  {searchParams}: {searchParams: Promise<searchParams>}
){
  const {query}=await searchParams;
  const params={search: query ? `${query}*` : null}
  const {data:posts}=await sanityFetch({
    query:STARTUP_QUERY,
    params,
  })



  return (
    <>
  <section className="pink_container pattern">
    <h1 className="heading">
      Pitch Your StartUp <br/>
      connect with entrepreneurs and investors
    </h1>
    <p className="sub-heading !max-w-3xl">
      Submit ideas,Vote on Pitches,and Get Noticed in Virtual Competitions
    </p>
    <SearchForm query={query}/>
  </section>
  <section className="section_container">
    <p className="text-30-semibold">
      {
        query
          ? `You are searching for "${query}"`
          : "All Startups"
      }
    </p>
      <ul className="mt-7 card_grid">
      {
        posts.length>0?(
          posts.map((post,index:number)=>(
            <StartUpCard key={post._createdAt} post={post as StartupTypeCard}/>
          ))
        ):(
          <p className="no-result">
            No Startups Found
          </p>
        )
      }
      </ul>
  </section>
</>
  );
}