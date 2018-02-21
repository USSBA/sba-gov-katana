export default {
  isLoaded: true,
  title: 'How to write a business plan',
  course: {
    url: 'https://www.youtube.com/embed/owsfdh4gxyc',
    worksheets: [
      {
        description: 'How to write a business plan checklist',
        url: '#'
      }
    ]
  },
  breadcrumbs: [
    {
      url: '#',
      title: 'Learning Center'
    },
    {
      url: '#',
      title: 'Search results'
    },
    {
      url: '#',
      title: 'How to write a business plan'
    }
  ],
  readMoreSectionItem: {
    expandedCopyText: 'expanded text',
    titleText: 'title text',
    preview: 'preview text'
  },
  readMoreExpanded: true,
  onToggleStatus: () => {
    return false
  }
}
