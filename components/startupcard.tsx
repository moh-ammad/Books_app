import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Author, Startup } from "@/sanity/types"

export type StartupTypeCard = Omit<Startup,"author"> & {author?:Author}   

const StartUpCard = (
  {post}: {post:StartupTypeCard }
) => {
  const { _createdAt,views,author,_id,description,category,image,title}=post
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">
          {formatDate(_createdAt)}
        </p>
        <div className="flex-between gap-1.5">
          <EyeIcon className="size-5 text-primary-default"/>
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">
              {title}
            </h3>
            </Link>
          </div>
          <Link href={`/user/${author?._id}`}>
           <Image
           src={author?.image||"/avatar.png"}
           alt="startup image"
            width={50}
            height={50}
            className="rounded-full object-cover size-12"
           />
          </Link>
        </div>
        <Link href={`/startup/${_id}`}>
          <p className="startup-card_desc">
            {description}
          </p>
          <Image src={image||"/avatar.png"} className="startup-card_img" alt="startup image" width={500} height={300} />
        </Link>
        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">
            {category}
          </p>
          </Link>
          <Button className="startup-card_btn" asChild>
            <Link href={`/startup/${_id}`}>
              View Details
            </Link>
          </Button>
        </div>
    </li>
  )
}

export default StartUpCard