import { formatDate } from '@/lib/utils';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { client } from '@/sanity/lib/client';
import StartUpCard, { StartupCardSkeleton, StartupTypeCard } from '@/components/startupcard';


export const experimental_ppr = true;




const StartUpPage = async (
  { params }: { params: Promise<{ id: string }> }
) => {

  const md = markdownit();

  const { id } = await params;
  const [post, data] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  const editorPosts = data?.select || [];

  // Safely extract editor posts from playlist

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px] pattern">
        <p className="tag tag-tri">{formatDate(post?._createdAt || "2025-06-06T17:43:42Z")}</p>

        <h1 className="heading">
          {post?.title}
        </h1>
        <p className="sub-heading !max-w-5xl">
          {post?.description}
        </p>
      </section>
      <section className="section_container">
        <img
          src={post?.image || "/avatar.png"}
          alt="thumbnail"
          className="w-full h-auto max-h-[500px] rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post?.author?.image || "/avatar.png"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post?.category}</p>

          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartUpCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  )
}

export default StartUpPage