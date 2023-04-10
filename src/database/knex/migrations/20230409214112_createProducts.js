exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.text("price").notNullable();
  table.text("description").notNullable();
  table.text("group").notNullable();

  table.integer("user_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("update_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products");
