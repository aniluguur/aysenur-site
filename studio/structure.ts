import type {StructureResolver} from 'sanity/structure'

const singleton = (S: Parameters<StructureResolver>[0], typeName: string, title: string) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('İçerik')
    .items([
      S.documentTypeListItem('project').title('Projeler'),
      S.documentTypeListItem('category').title('Sektörler'),
      S.divider(),
      S.listItem()
        .title('Sayfa İçerikleri')
        .child(
          S.list()
            .title('Sayfa İçerikleri')
            .items([
              singleton(S, 'homePage', 'Ana Sayfa'),
              singleton(S, 'aboutPage', 'Hakkımızda'),
              singleton(S, 'contactPage', 'İletişim'),
            ]),
        ),
      S.divider(),
      singleton(S, 'siteSettings', 'Ayarlar'),
    ])
