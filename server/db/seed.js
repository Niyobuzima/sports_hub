const bcrypt = require('bcrypt');
const { pool } = require('./pool');

const categories = [
  // name, reg fee, monthly, referral %, withdrawal limit, reward x, facilities
  ['Bronze',   20,  15,  2,  500, 1.0, 'Gym'],
  ['Silver',   40,  25,  3,  400, 1.25, 'Gym, Football'],
  ['Gold',     60,  40,  5,  300, 1.5, 'Gym, Football, Swimming'],
  ['Platinum', 100, 60,  7,  200, 1.75, 'Gym, Football, Swimming, Tennis, Basketball'],
  ['VIP',      150, 90, 10,  100, 2.0, 'All facilities'],
];

async function seed() {
  // roles
  for (const name of ['customer', 'instructor', 'admin']) {
    await pool.query(
      'INSERT INTO roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
      [name]
    );
  }

  // membership categories
  for (const c of categories) {
    await pool.query(
      `INSERT INTO membership_categories
        (name, registration_fee, monthly_fee, referral_percent, withdrawal_limit, reward_multiplier, facilities)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (name) DO NOTHING`,
      c
    );
  }

  // one admin account
  const adminRole = await pool.query("SELECT id FROM roles WHERE name = 'admin'");
  const hash = await bcrypt.hash('admin123', 10);
  await pool.query(
    `INSERT INTO users (full_name, email, password_hash, role_id, account_status)
     VALUES ($1,$2,$3,$4,'active')
     ON CONFLICT (email) DO NOTHING`,
    ['Site Admin', 'admin@sportshub.local', hash, adminRole.rows[0].id]
  );

  console.log('Seed done. Admin login: admin@sportshub.local / admin123');
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
