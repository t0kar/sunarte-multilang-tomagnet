import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  language,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
  "translations": translations[]->{
    "title": coalesce(title, "Untitled"),
    "slug": slug.current,
    language
  }
`;

export const heroQueryByLang = defineQuery(`
  *[_type == "post" && defined(slug.current) && language == $lang] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current) && language == $lang] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && language == $lang] [0] {
    content,
    ${postFields}
  }
`);

export const postSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(language)] {
    "slug": slug.current,
    "lang": language
  }
`);
