import { get } from './drupal-eight.js'

function fetchCourses() {
  // kevin you can make changes in here, for your additional filtering
  // be sure to catch the query params for your filtering from the invoking api call route

  return get('courses').then(result => {
    return result
  })
}

function fetchCourse(params) {
  // avery changes
  // add optional filtering based on pathname query
  // may have to use helper function to map pathname to course id or something
  // be sure to catch the query params for the pathname from the invoking api call route

  return get('courses').then(courses => {
    console.log('D', params.pathname)

    const result = courses[1]

    return result
  })
}

export { fetchCourses, fetchCourse }
