import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Sektör',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      description: 'Nav dropdown ve listelerde gösterim sırası',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description', media: 'coverImage'},
  },
})
