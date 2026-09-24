import { defineField, defineType } from 'sanity';

export const figure = defineType({
  name: 'figure',
  title: 'Figure',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' })
  ]
});
