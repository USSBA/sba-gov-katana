function search(req, res) {
  // query search results

  console.log('AA', req)

  let result = []

  if (decodeURIComponent(req.term) !== 'no new taxes') {
    result = [
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      },
      {
        title: 'Title',
        description:
          'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
        url: 'https://sba.gov/lorem-ipsum/'
      }
    ]
  }

  return Promise.resolve(JSON.stringify(result))
}

export { search }
