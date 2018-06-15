import { filterArticles } from '../../../../src/service/drupal-eight'

const props = {
  articles: [
    {
      body: 'Download the attached file.',
      category: ['Press release'],
      officeLink: {
        url: 'https://sba.gov/offices/headquarters/ooi',
        title: 'Office of Investment and Innovation'
      },
      file: '/sites/default/files/files/inv_sbic-2008-10-b-831641en1_0.pdf',
      programs: ['SBIC'],
      relatedDocuments: [],
      summary: 'Offering Circular',
      type: 'article',
      title: 'SBIC 2008-10 B, CUSIP 831641 EN1',
      id: 3962,
      updated: 1507645187,
      created: 1287460235,
      url: '/article/2010/oct/19/sbic-2008-10-b-cusip-831641-en1'
    },
    {
      body: 'Download the attached file.',
      category: ['Offering Circular - Debenture'],
      officeLink: {
        url: 'https://sba.gov/offices/headquarters/212',
        title: 'Office of Online'
      },
      file: '/sites/default/files/files/inv_sbic-2008-10-a-831641el5_0.pdf',
      programs: ['SBIC'],
      relatedDocuments: [],
      summary: 'Offering Circular',
      type: 'article',
      title: 'gotit',
      id: 3964,
      updated: 1507645215,
      created: 1287460532,
      url: '/article/2010/oct/19/sbic-2008-10-cusip-831641-el5'
    },
    {
      body: 'Download the attached file.',
      category: ['Press release'],
      officeLink: {
        url: 'https://www.google.com',
        title: 'Office of Internet'
      },
      file: '/sites/default/files/files/1010.pdf',
      programs: ['Good'],
      relatedDocuments: [],
      summary: 'Offering Coffe',
      type: 'article',
      title: '1111',
      id: 3963,
      updated: 1507645466,
      created: 1287460800,
      url: '/article/2010/oct/19/1111'
    },
    {
      body: 'Download the attached file.',
      category: ['Something'],
      officeLink: {
        url: 'https://www.yahoo.com',
        title: 'Office of There'
      },
      file: '/sites/default/files/files/1234.pdf',
      programs: ['SBIC'],
      relatedDocuments: [],
      summary: 'Offering Snacks',
      type: 'article',
      title: '1819',
      id: 3961,
      updated: 1507645211,
      created: 1287460153,
      url: '/article/2010/oct/19/1819'
    }
  ],
  paramsOne: {
    sortBy: 'Authored on Date',
    searchTerm: '',
    articleCategory: 'Press release',
    program: 'all',
    page: '1',
    start: '0',
    end: '30'
  },
  paramsTwo: {
    sortBy: 'Authored on Date',
    searchTerm: '',
    articleCategory: 'Press release',
    program: 'Good',
    page: '1',
    start: '0',
    end: '30'
  }
}

describe('#Filter Article', function() {
  it('should return two articles categorized as Press release', function() {
    const filteredArticles = filterArticles(props.paramsOne, props.articles)
    filteredArticles[0].title.should.equal('SBIC 2008-10 B, CUSIP 831641 EN1')
    filteredArticles[1].title.should.equal('1111')
  })
  it('should return one article categorized as Press release and program as SBIC', function() {
    const filteredArticles = filterArticles(props.paramsTwo, props.articles)
    filteredArticles[0].title.should.equal('1111')
  })
})
