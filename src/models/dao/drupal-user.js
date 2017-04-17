import { users } from "../drupal-users";

function findDrupalUser(userId) {
  return users.findOne({
    where: {
      uid: {
        $eq: userId
      }
    }
  });
}

function fetchDrupalUserEmail(userId) {
  return findDrupalUser(userId).then(function(user) {
    return user.mail;
  });
}

export { findDrupalUser, fetchDrupalUserEmail };