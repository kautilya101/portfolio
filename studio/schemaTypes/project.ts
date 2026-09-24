import { defineArrayMember, defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'story', title: 'Story', default: true },
    { name: 'report', title: 'Report' },
    { name: 'media', title: 'Media' },
    { name: 'links', title: 'Links' }
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'story', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'story',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'category', type: 'string', group: 'story', description: 'Desk label, e.g. Technology, Mobile, Real-Time' }),
    defineField({ name: 'headline', type: 'string', group: 'story', description: 'Sub-headline, e.g. A form builder for the modern web' }),
    defineField({ name: 'description', type: 'text', rows: 3, group: 'story', validation: (rule) => rule.required().max(280) }),
    defineField({ name: 'year', type: 'string', group: 'story' }),
    defineField({ name: 'role', type: 'string', group: 'story' }),
    defineField({ name: 'featured', type: 'boolean', group: 'story', initialValue: false }),
    defineField({ name: 'order', type: 'number', group: 'story', description: 'Lower numbers appear first' }),
    defineField({
      name: 'technologies',
      type: 'array',
      group: 'story',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }
    }),
    defineField({ name: 'problem', title: 'The problem', type: 'blockContent', group: 'report' }),
    defineField({ name: 'approach', title: 'The approach', type: 'blockContent', group: 'report' }),
    defineField({ name: 'implementation', title: 'The system', type: 'blockContent', group: 'report' }),
    defineField({
      name: 'results',
      title: 'What I built',
      type: 'array',
      group: 'report',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'lessons', type: 'blockContent', group: 'report' }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'figure', group: 'media' }),
    defineField({
      name: 'gallery',
      type: 'array',
      group: 'media',
      description: 'The first two images interrupt the article; the rest form The Interface.',
      of: [defineArrayMember({ type: 'figure' })],
      options: { layout: 'grid' }
    }),
    defineField({ name: 'github', title: 'GitHub URL', type: 'url', group: 'links' }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url', group: 'links' })
  ],
  orderings: [
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Year, newest', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'title', subtitle: 'headline', media: 'coverImage', featured: 'featured' },
    prepare: ({ title, subtitle, media, featured }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle,
      media
    })
  }
});
