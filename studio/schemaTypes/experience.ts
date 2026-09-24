import { defineArrayMember, defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'startDate', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'endDate', type: 'date', description: 'Leave empty for a current role' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'surfaces',
      type: 'array',
      description: 'Feeds the One engineer. Multiple surfaces. diagram',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'API', value: 'api' },
          { title: 'Data', value: 'data' },
          { title: 'AI', value: 'ai' },
          { title: 'Infra', value: 'infra' }
        ],
        layout: 'grid'
      }
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }
    }),
    defineField({ name: 'achievements', type: 'array', of: [defineArrayMember({ type: 'string' })] })
  ],
  orderings: [{ title: 'Start date, newest', name: 'startDesc', by: [{ field: 'startDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'company', subtitle: 'role', start: 'startDate', end: 'endDate' },
    prepare: ({ title, subtitle, start, end }) => ({
      title,
      subtitle: `${subtitle ?? ''} · ${start ? String(start).slice(0, 4) : ''}–${end ? String(end).slice(0, 4) : 'now'}`
    })
  }
});
