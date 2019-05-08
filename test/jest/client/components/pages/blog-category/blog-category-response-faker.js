function blogQueryResponse(blogCount) {
  const response = []
  for (let i = 0; i < blogCount; i++) {
    response.push(blogBuilder())
  }
  return response
}

function blogBuilder() {
  const blog = {
    author: Math.floor(Math.random * 10000),
    blogBody: [],
    blogCategory: 'News and Views',
    blogTags: 'Business Laws',
    summary:
      'The U.S. Small Business Administration recently proposed new regulations to make it easier for small businesses to understand and comply with the Historically Underutilized Business Zone (HUBZone) Program’s requirements.',
    type: 'blog',
    title: 'SBA Proposes New Rule Changes for the HUBZone Program',
    id: Math.floor(Math.random * 100),
    updated: 1556207291,
    created: 1576082790,
    langCode: 'en',
    url: '/blog/' + Math.floor(Math.random * 100)
  }
  return blog
}

export { blogQueryResponse }
