/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  language?: "hr" | "en" | "fr" | "de";
  translations?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "post";
  }>;
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  excerpt?: string;
  coverImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  date?: string;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
};

export type Author = {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  picture?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type Settings = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  footer?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    metadataBase?: string;
    _type: "image";
  };
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type SanityAssistInstructionTask = {
  _type: "sanity.assist.instructionTask";
  path?: string;
  instructionKey?: string;
  started?: string;
  updated?: string;
  info?: string;
};

export type SanityAssistTaskStatus = {
  _type: "sanity.assist.task.status";
  tasks?: Array<{
    _key: string;
  } & SanityAssistInstructionTask>;
};

export type SanityAssistSchemaTypeAnnotations = {
  _type: "sanity.assist.schemaType.annotations";
  title?: string;
  fields?: Array<{
    _key: string;
  } & SanityAssistSchemaTypeField>;
};

export type SanityAssistOutputType = {
  _type: "sanity.assist.output.type";
  type?: string;
};

export type SanityAssistOutputField = {
  _type: "sanity.assist.output.field";
  path?: string;
};

export type SanityAssistInstructionContext = {
  _type: "sanity.assist.instruction.context";
  reference?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "assist.instruction.context";
  };
};

export type AssistInstructionContext = {
  _id: string;
  _type: "assist.instruction.context";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  context?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type SanityAssistInstructionUserInput = {
  _type: "sanity.assist.instruction.userInput";
  message?: string;
  description?: string;
};

export type SanityAssistInstructionPrompt = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  } | {
    _key: string;
  } & SanityAssistInstructionFieldRef | {
    _key: string;
  } & SanityAssistInstructionContext | {
    _key: string;
  } & SanityAssistInstructionUserInput>;
  style?: "normal";
  listItem?: never;
  markDefs?: null;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type SanityAssistInstructionFieldRef = {
  _type: "sanity.assist.instruction.fieldRef";
  path?: string;
};

export type SanityAssistInstruction = {
  _type: "sanity.assist.instruction";
  prompt?: SanityAssistInstructionPrompt;
  icon?: string;
  title?: string;
  userId?: string;
  createdById?: string;
  output?: Array<{
    _key: string;
  } & SanityAssistOutputField | {
    _key: string;
  } & SanityAssistOutputType>;
};

export type SanityAssistSchemaTypeField = {
  _type: "sanity.assist.schemaType.field";
  path?: string;
  instructions?: Array<{
    _key: string;
  } & SanityAssistInstruction>;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | Post | Author | Slug | Settings | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | SanityAssistInstructionTask | SanityAssistTaskStatus | SanityAssistSchemaTypeAnnotations | SanityAssistOutputType | SanityAssistOutputField | SanityAssistInstructionContext | AssistInstructionContext | SanityAssistInstructionUserInput | SanityAssistInstructionPrompt | SanityAssistInstructionFieldRef | SanityAssistInstruction | SanityAssistSchemaTypeField;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./app/(blog)/[lang]/posts/[slug]/page.tsx
// Variable: postSlugsForStaticParams
// Query: *[_type == "post" && defined(slug.current) && defined(language)]{    "slug": slug.current,    "lang": language  }
export type PostSlugsForStaticParamsResult = Array<{
  slug: string | null;
  lang: "de" | "en" | "fr" | "hr" | null;
}>;

// Source: ./sanity/lib/queries.ts
// Variable: settingsQuery
// Query: *[_type == "settings"][0]
export type SettingsQueryResult = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  footer?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    metadataBase?: string;
    _type: "image";
  };
} | null;
// Variable: heroQueryByLang
// Query: *[_type == "post" && defined(slug.current) && language == $lang] | order(date desc, _updatedAt desc) [0] {    content,      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  language,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{"name": coalesce(name, "Anonymous"), picture},  "translations": translations[]->{    "title": coalesce(title, "Untitled"),    "slug": slug.current,    language  }  }
export type HeroQueryByLangResult = {
  content: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  _id: string;
  status: "draft" | "published";
  title: string | "Untitled";
  slug: string | null;
  language: "de" | "en" | "fr" | "hr" | null;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  date: string;
  author: {
    name: string | "Anonymous";
    picture: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
  translations: Array<{
    title: string | "Untitled";
    slug: string | null;
    language: "de" | "en" | "fr" | "hr" | null;
  }> | null;
} | null;
// Variable: moreStoriesQuery
// Query: *[_type == "post" && _id != $skip && defined(slug.current) && language == $lang] | order(date desc, _updatedAt desc) [0...$limit] {      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  language,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{"name": coalesce(name, "Anonymous"), picture},  "translations": translations[]->{    "title": coalesce(title, "Untitled"),    "slug": slug.current,    language  }  }
export type MoreStoriesQueryResult = Array<{
  _id: string;
  status: "draft" | "published";
  title: string | "Untitled";
  slug: string | null;
  language: "de" | "en" | "fr" | "hr" | null;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  date: string;
  author: {
    name: string | "Anonymous";
    picture: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
  translations: Array<{
    title: string | "Untitled";
    slug: string | null;
    language: "de" | "en" | "fr" | "hr" | null;
  }> | null;
}>;
// Variable: moreStoriesCountQuery
// Query: count(*[_type == "post" && _id != $skip && defined(slug.current) && language == $lang])
export type MoreStoriesCountQueryResult = number;
// Variable: postQuery
// Query: *[_type == "post" && slug.current == $slug && language == $lang] [0] {    content,      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  language,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{"name": coalesce(name, "Anonymous"), picture},  "translations": translations[]->{    "title": coalesce(title, "Untitled"),    "slug": slug.current,    language  }  }
export type PostQueryResult = {
  content: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  _id: string;
  status: "draft" | "published";
  title: string | "Untitled";
  slug: string | null;
  language: "de" | "en" | "fr" | "hr" | null;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  date: string;
  author: {
    name: string | "Anonymous";
    picture: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
  translations: Array<{
    title: string | "Untitled";
    slug: string | null;
    language: "de" | "en" | "fr" | "hr" | null;
  }> | null;
} | null;
// Variable: postSlugs
// Query: *[_type == "post" && defined(slug.current) && defined(language)] {    "slug": slug.current,    "lang": language  }
export type PostSlugsResult = Array<{
  slug: string | null;
  lang: "de" | "en" | "fr" | "hr" | null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"post\" && defined(slug.current) && defined(language)]{\n    \"slug\": slug.current,\n    \"lang\": language\n  }": PostSlugsForStaticParamsResult;
    "*[_type == \"settings\"][0]": SettingsQueryResult;
    "\n  *[_type == \"post\" && defined(slug.current) && language == $lang] | order(date desc, _updatedAt desc) [0] {\n    content,\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  language,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{\"name\": coalesce(name, \"Anonymous\"), picture},\n  \"translations\": translations[]->{\n    \"title\": coalesce(title, \"Untitled\"),\n    \"slug\": slug.current,\n    language\n  }\n\n  }\n": HeroQueryByLangResult;
    "\n  *[_type == \"post\" && _id != $skip && defined(slug.current) && language == $lang] | order(date desc, _updatedAt desc) [0...$limit] {\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  language,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{\"name\": coalesce(name, \"Anonymous\"), picture},\n  \"translations\": translations[]->{\n    \"title\": coalesce(title, \"Untitled\"),\n    \"slug\": slug.current,\n    language\n  }\n\n  }\n": MoreStoriesQueryResult;
    "\n  count(*[_type == \"post\" && _id != $skip && defined(slug.current) && language == $lang])\n": MoreStoriesCountQueryResult;
    "\n  *[_type == \"post\" && slug.current == $slug && language == $lang] [0] {\n    content,\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  language,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{\"name\": coalesce(name, \"Anonymous\"), picture},\n  \"translations\": translations[]->{\n    \"title\": coalesce(title, \"Untitled\"),\n    \"slug\": slug.current,\n    language\n  }\n\n  }\n": PostQueryResult;
    "\n  *[_type == \"post\" && defined(slug.current) && defined(language)] {\n    \"slug\": slug.current,\n    \"lang\": language\n  }\n": PostSlugsResult;
  }
}
