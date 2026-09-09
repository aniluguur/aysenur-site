import {defineField, defineType} from 'sanity'

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Değer',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Başlık', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Açıklama', type: 'text'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
