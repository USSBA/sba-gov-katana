function search(req, res) {
  // query search results

  const result = {
    test: 'test'
  }

  return Promise.resolve(JSON.stringify(result))

  //res.send(JSON.stringify(result))
}

export { search }
