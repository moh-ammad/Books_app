import { defineQuery } from "next-sanity";

export const STARTUP_QUERY=defineQuery(`*[_type == "startup" &&
   defined(slug.current) && 
   !defined($search)
   || title match $search 
   || category match $search 
   || author->name match $search ]
   |order(_createdAt desc) {
  _id,
    title,
    slug,
    _createdAt,
     views,
  category,
    description,
    image,
  author->{
   _id,name,image,username,bio
  },
 
}`
)

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);
