exports.up = knex => knex.schema.createTable("favorites", table => {

  table.increments("id").primary()

  table.integer("user_id").references("id").inTable("users");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  
});

exports.down = knex => knex.schema.dropTable("favorites");
