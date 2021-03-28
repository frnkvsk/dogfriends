/**
 * Generate a selective update query based on a request body:
 *
 * - table: where to make the query
 * - items: an object with keys of columns you want to update and values with updated values
 * - key: the column that we query by (e.g. username, handle, id)
 * - id: current record ID
 *
 * Returns object containing a DB query as a string, and array of
 * string values to be updated
 *
 */

function sqlForPartialUpdate(table, items, key, id) {
  // keep track of item indexes
  // store all the columns we want to update and associate with vals

  let idx = 1;
  let columns = [];

  // filter out keys that start with '_' -- we don't want these in DB
  for (let key in items) {
    if (key.startsWith('_')) {
      delete items[key]
    }
  }

  for (let column in items) {
    columns.push(`${column}=$${idx}`);
    idx += 1;
  }

  // // if updating users table, update the updated_on field
  // if(table === 'users') {
  //   const timestamp = 
  //   columns.push()
  // }

  // build query
  let cols = columns.join(', ');
  let query = `UPDATE ${table} SET ${cols} WHERE UPPER(${key})=UPPER($${idx}) RETURNING *`;

  let values = Object.values(items);
  values.push(id);

  return {query, values};
}


module.exports = sqlForPartialUpdate;
