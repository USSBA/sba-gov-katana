import { get } from './drupal-eight.js'

function fetchCourses(params) {
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
