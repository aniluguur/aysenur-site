import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proje',
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
      name: 'category',
      title: 'Sektör',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kısa Açıklama',
      type: 'text',
      description: 'Kartlarda ve liste görünümlerinde kullanılır',
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Başlık', value: 'h3'},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Kalın', value: 'strong'},
              {title: 'İtalik', value: 'em'},
            ],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'location',
      title: 'Lokasyon',
      type: 'string',
    }),
    defineField({
      name: 'projectDate',
      title: 'Proje Tarihi',
      type: 'date',
      options: {dateFormat: 'YYYY-MM'},
    }),
    defineField({
      name: 'technicalInfo',
      title: 'Teknik Bilgiler',
      type: 'array',
      of: [{type: 'technicalInfoItem'}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'location', media: 'coverImage'},
  },
})
