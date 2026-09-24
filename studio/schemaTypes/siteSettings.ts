import { defineArrayMember, defineField, defineType } from 'sanity';

const SECTIONS = [
  { name: 'about', title: 'About' },
  { name: 'experience', title: 'Experience' },
  { name: 'projects', title: 'Projects' },
  { name: 'stack', title: 'Tools of the trade' },
  { name: 'lab', title: 'From the lab' },
  { name: 'contact', title: 'Contact' }
];

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'front', title: 'Front page' },
    { name: 'about', title: 'About' },
    { name: 'contact', title: 'Contact' },
    { name: 'index', title: 'Stack & Lab' },
    { name: 'sections', title: 'Sections' }
  ],
  fields: [
    defineField({ name: 'name', type: 'string', group: 'identity', validation: (rule) => rule.required() }),
    defineField({ name: 'role', type: 'string', group: 'identity', validation: (rule) => rule.required() }),
    defineField({ name: 'publication', title: 'Publication name', type: 'string', group: 'identity', initialValue: 'The Engineering Post' }),
    defineField({ name: 'tagline', type: 'string', group: 'identity', initialValue: 'Software • Web • Mobile • Systems' }),
    defineField({ name: 'description', title: 'SEO description', type: 'text', rows: 2, group: 'identity' }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline lines',
      type: 'array',
      group: 'front',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Each entry is printed as its own line'
    }),
    defineField({ name: 'heroIntro', title: 'Hero intro', type: 'text', rows: 3, group: 'front' }),
    defineField({ name: 'portrait', type: 'figure', group: 'front' }),
    defineField({ name: 'bio', type: 'blockContent', group: 'about' }),
    defineField({ name: 'location', type: 'string', group: 'about', description: 'e.g. Based in India' }),
    defineField({ name: 'yearsExperience', type: 'string', group: 'about', description: 'e.g. 3+ years experience' }),
    defineField({ name: 'focus', type: 'string', group: 'about', description: 'e.g. Web / Mobile / Backend' }),
    defineField({ name: 'email', type: 'string', group: 'contact', validation: (rule) => rule.email() }),
    defineField({ name: 'github', type: 'url', group: 'contact' }),
    defineField({ name: 'linkedin', type: 'url', group: 'contact' }),
    defineField({ name: 'resume', type: 'file', group: 'contact', options: { accept: 'application/pdf' } }),
    defineField({ name: 'resumeUrl', title: 'Resume URL (alternative to file)', type: 'url', group: 'contact' }),
    defineField({
      name: 'contactHeadline',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Lines for the final edition headline'
    }),
    defineField({
      name: 'stack',
      title: 'Tools of the trade',
      type: 'array',
      group: 'index',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stackGroup',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'items', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' } })
          ],
          preview: {
            select: { title: 'label', items: 'items' },
            prepare: ({ title, items }) => ({ title, subtitle: ((items as string[] | undefined) ?? []).join(' · ') })
          }
        })
      ]
    }),
    defineField({
      name: 'lab',
      title: 'From the lab',
      type: 'array',
      group: 'index',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'labItem',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'note', type: 'string' }),
            defineField({ name: 'url', type: 'url' })
          ]
        })
      ]
    }),
    defineField({
      name: 'sections',
      title: 'Visible sections',
      type: 'object',
      group: 'sections',
      description: 'Switch a section off to omit it from the site, its navigation entry and its page. Empty sections are hidden automatically.',
      options: { columns: 2 },
      fields: SECTIONS.map((section) => defineField({ name: section.name, title: section.title, type: 'boolean', initialValue: true }))
    })
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) }
});
