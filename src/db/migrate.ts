import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pkg from 'pg';

const { Pool } = pkg;

config({ path: '.env' });

async function runMigrations() {
    console.log('⏳ Running migrations...');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    const db = drizzle(pool);

    try {
        await migrate(db, { migrationsFolder: './migrations' });
        console.log('✅ Migrations completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runMigrations();
