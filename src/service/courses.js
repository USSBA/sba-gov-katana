import { get } from './drupal-eight.js'

function fetchCourses() {
  // kevin you can make changes in here, for your additional filtering
  // be sure to catch the query params for your filtering from the invoking api call route

  return get('courses').then(result => {
    return result
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
