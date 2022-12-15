const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// the following assumes that you named your connection variable `pool`
// pool.query(`SELECT title FROM properties LIMIT 10;`)
//   .then(response => { console.log(response); });


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1`, [email])
    .then((result) => {
      //console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1
    LIMIT 1`, [id])
    .then((result) => {
      //console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
    SELECT reservations.* 
    FROM reservations 
    WHERE reservations.guest_id = $1 
    LIMIT $2`, [guest_id, limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
  //return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  // 1. Setup an array to hold any parameters that may be available for the query.
  const queryParams = [];
  // 2. Start the query with all information that comes before the WHERE clause.
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // CITY
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  // OWNER
  if (options.owner_id) {

    if (queryString.includes(`WHERE`)){
      queryString += `AND`
    } else {
      queryString += `WHERE`
    }

    queryParams.push(Number(options.owner_id));
    queryString += ` owner_id = $${queryParams.length} `;
  }

  //MIN PRICE PER NIGHT
  if (options.minimum_price_per_night) {

    if (queryString.includes(`WHERE`)) {
      queryString += `AND`;
    } else {
      queryString += `WHERE`;
    }

    queryParams.push(Number(options.minimum_price_per_night));
    queryString += ` cost_per_night > $${queryParams.length} `;
  }

  //MAX PRICE PER NIGHT
  if (options.maximum_price_per_night) {

    if (queryString.includes(`WHERE`)) {
      queryString += `AND`;
    } else {
      queryString += `WHERE`;
    }

    queryParams.push(Number(options.maximum_price_per_night));
    queryString += ` cost_per_night < $${queryParams.length} `;
  }

  // GROUP BY
  queryString += `
  GROUP BY properties.id
  `;

  //HAVING MINIMUM RATING
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING AVG(rating) >= $${queryParams.length} `;
  }

  //ORDER BY && LIMIT
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then((result) => {
     //console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
