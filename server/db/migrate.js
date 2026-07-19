const fs = require('fs');
const path = require('path');
const { pool } = require('./pool');

const migrationsDir = path.join(__dirname, 'migrations');

async function run() {
  // make sure the tracker table exists first
  const tracker = fs.readFileSync(
    path.join(migrationsDir, '000_migrations_tracker.sql'),
    'utf8'
  );
  await pool.query(tracker);

  const applied = await pool.query('SELECT filename FROM schema_migrations');
  const done = applied.rows.map((r) => r.filename);

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (done.includes(file)) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log('Running', file);
    await pool.query(sql);
    await pool.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
  }

  console.log('Migrations done');
  await pool.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
