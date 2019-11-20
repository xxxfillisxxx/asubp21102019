module.exports = {


  friendlyName: 'Resort',


  description: 'Resort something.',


  inputs: {
    datastore: {
      type: 'ref',
      description: 'datastore of resorting model',
      example: 'User.getDatastore()',
      required: true
    },
    tableName: {
      type: 'string'
    },
    criteria: {
      type: 'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const where = inputs.criteria ? `WHERE ${inputs.criteria.name} = ${inputs.criteria.value} `: ''
    const tname = inputs.tableName

    const sql = `UPDATE ${tname}
    JOIN (
      SELECT d.id as id, d2.row_num as row_num FROM ${tname} d
      JOIN
        (SELECT id, (@i := (@i + 10)) as row_num FROM ${tname} as d1
        JOIN (SELECT @i := 0) i
        ${where}
        ORDER BY orderField ASC) d2
      ON d.id = d2.id) x
    ON ${tname}.id = x.id
    SET ${tname}.orderField = x.row_num`

    const datastore = inputs.datastore;
    const raw = await datastore.sendNativeQuery(sql)

    // All done.
    return exits.success(raw);

  }


};

