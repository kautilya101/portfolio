import type { StructureResolver } from 'sanity/structure';

export const SINGLETONS = new Set(['siteSettings']);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Newsroom')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings')),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('experience').title('Experience')
    ]);
