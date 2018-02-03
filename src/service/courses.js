import { get } from './drupal-eight.js'

function fetchCourses(params) {
  // kevin you can make changes in here, for your additional filtering
  // be sure to catch the query params for your filtering from the invoking api call route
  return get('courses').then(result => {
    const filteredResult = []
    if (!params.businessStage || params.businessStage === 'All') {
      return result
    } else {
      result.forEach(item => {
        if (item.courseCategory.includes(params.businessStage)) {
          filteredResult.push(item)
        }
      })
      return filteredResult
    }
  })
}

function fetchCourse(params) {
  return get('courses').then(courses => {
    const result = courses.find((course, index) => {
      let item

      if (course.url === params.pathname) {
        item = course
        item.isFound = true
      }
      return item
    })

    return result
  })
}

export { fetchCourses, fetchCourse }
