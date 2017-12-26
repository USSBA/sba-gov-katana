function search(req, res) {
  // query search results

  console.log('AA', req)

  let result = [
    {
      hits: {
        found: 0,
        hit: []
      }
    }
  ]

  if (decodeURIComponent(req.term) !== 'no new taxes') {
    result = [
      {
        status: {
          rid: 'rd+5+r0oMAo6swY=',
          'time-ms': 9
        },
        hits: {
          found: 3,
          start: 0,
          hit: [
            {
              id: 'tt1951265',
              fields: {
                title: 'The Hunger Games: Mockingjay - Part 1',
                description:
                  'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
                url: 'https://sba.gov/lorem-ipsum/'
              }
            },
            {
              id: 'tt1951264',
              fields: {
                title: 'The Hunger Games: Catching Fire',
                description:
                  'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
                url: 'https://sba.gov/lorem-ipsum/'
              }
            },
            {
              id: 'tt1392170',
              fields: {
                title: 'The Hunger Games',
                description:
                  'Excepturi quod vel dignissimos. Aut ut eligendi repellendus. Necessitatibus dicta commodi voluptatem molestiae praesentium hic accusamus cupiditate. Nesciunt at ab est. Voluptate et enim nisi voluptates aliquam magnam.',
                url: 'https://sba.gov/lorem-ipsum/'
              }
            }
          ]
        }
      }
    ]
  }

  return Promise.resolve(JSON.stringify(result))
}

export { search }
