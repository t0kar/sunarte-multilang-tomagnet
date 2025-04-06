import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description:
        'The old URL path (e.g., /posts/sibenik-cap). Must start with a slash.',
      validation: (rule) =>
        rule.required().regex(/^\//, 'Source path must start with a slash'),
    }),
    defineField({
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description:
        'The new URL path (e.g., /hr/posts/sibenska-kapa). Must start with a slash.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\//, 'Destination path must start with a slash'),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect',
      type: 'boolean',
      description:
        'If true, returns a 308 status code. If false, returns a 307 status code.',
      initialValue: true,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'If false, this redirect will be ignored.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent',
      active: 'active',
    },
    prepare({ source, destination, permanent, active }) {
      return {
        title: `${source} → ${destination}`,
        subtitle: `${permanent ? 'Permanent' : 'Temporary'} redirect (${active ? 'Active' : 'Inactive'})`,
      };
    },
  },
});
