import { fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal } from '../util/drupal-rest.js'
import { fetchDisasterFromDrupalDatabase } from '../models/dao/disaster.js'
import { fetchMainMenu } from '../models/dao/main-menu.js'
import {
  fetchAnnouncements,
  fetchArticles,
  fetchContacts,
  fetchCounsellorCta,
  fetchDocuments,
  fetchFormattedMenu,
  fetchFormattedNode,
  fetchNodes,
  fetchTaxonomys
} from '../service/drupal-eight.js'
import { fetchNotification } from '../service/notification.js'
import { fetchCourses, fetchCourse } from '../service/courses.js'
import { search } from '../service/search.js'
import { officeSearch } from '../service/office-search.js'
import HttpStatus from 'http-status-codes'
import _ from 'lodash'
import querystring from 'querystring'

const fetchFunctions = {
  node: fetchFormattedNode
}

const fetchContentTypeFunctions = {
  announcements: fetchAnnouncements,
  articles: fetchArticles,
  blogs: fetchBlogsFromDrupal,
  contacts: fetchContacts,
  counsellorCta: fetchCounsellorCta,
  courses: fetchCourses,
  course: fetchCourse,
  disaster: fetchDisasterFromDrupalDatabase,
  documents: fetchDocuments,
  frontPageSlides: fetchFrontPageSlidesFromDrupal,
  offices: officeSearch,
  mainMenu: fetchMainMenu,
  nodes: fetchNodes,
  notification: fetchNotification,
  search: search,
  siteMap: fetchFormattedMenu,
  taxonomys: fetchTaxonomys,
  offices
}

function fetchContentById(req, res) {
  if (req.params && req.params.type && req.params.id) {
    const type = req.params.type
    const id = req.params.id
    const fetchFunction = fetchFunctions[type]
    if (fetchFunction) {
      fetchFunction(id, {
        headers: req.headers
      })
        .then(function(data) {
          res.status(HttpStatus.OK).send(data)
        })
        .catch(error => {
          console.error(error)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error retrieving content')
        })
    } else {
      console.error('fetchContentById encountered an unknown type ' + type)
      res.status(HttpStatus.BAD_REQUEST).send('Unknown Content Type: ' + type)
    }
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Incorrect request format missing type or id')
  }
}

function fetchContentByType(req, res) {
  if (req.params && req.params.type) {
    const type = req.params.type
    const fetchFunction = fetchContentTypeFunctions[type]
    if (fetchFunction) {
      fetchFunction(req.query)
        .then(function(data) {
          res.status(HttpStatus.OK).send(data)
        })
        .catch(error => {
          console.error(error)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error retrieving content')
        })
    } else {
      console.error('fetchContentById encountered an unknown type ' + type)
      res.status(HttpStatus.BAD_REQUEST).send('Unknown Content Type: ' + type)
    }
  } else {
    res.status(HttpStatus.BAD_REQUEST).send('Incorrect request format missing type.')
  }
}

export { fetchContentById, fetchContentByType }
