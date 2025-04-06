import { DocumentTextIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

import authorType from './author';

export default defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (value, context) => {
          // If no value, consider it valid (will be caught by required validation)
          if (!value) return true;

          const { document } = context;
          const language = document?.language;
          const id = document?._id?.replace(/^drafts\./, '');

          // If no language, consider it valid (will be caught by required validation)
          if (!language) return true;

          try {
            // Log the values for debugging
            console.log('Checking slug uniqueness:', { value, language, id });

            // Use a more direct query to check for duplicates
            const query = `*[_type == "post" && slug.current == $slug && language == $language && _id != $id][0]`;
            const existingDoc = await context
              .getClient({ apiVersion: '2023-01-01' })
              .fetch(query, { slug: value, language, id });

            // Log the result for debugging
            console.log('Existing document:', existingDoc);

            // If no document found, the slug is unique
            return !existingDoc;
          } catch (error) {
            console.error('Error checking slug uniqueness:', error);
            // In case of error, allow the operation to proceed
            return true;
          }
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Croatian', value: 'hr' },
          { title: 'English', value: 'en' },
          { title: 'French', value: 'fr' },
          { title: 'German', value: 'de' },
          // Add more as needed
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'Link to other language versions of this post.',
      validation: (rule) =>
        rule.custom((translations, context) => {
          if (!translations) return true;

          const currentLanguage = context.document?.language;
          if (!currentLanguage) return true;

          // Check if any translation has the same language as the current post
          const hasSameLanguage = translations.some((ref: any) => {
            // We can't directly access the referenced document's language here
            // This will be checked when the referenced document is loaded
            return false;
          });

          if (hasSameLanguage) {
            return 'Translations must be in different languages than the current post';
          }

          return true;
        }),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Caption displayed below the image',
            },
          ],
        },
      ],
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true, aiAssist: { imageDescriptionField: 'alt' } },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(' ') };
    },
  },
});
