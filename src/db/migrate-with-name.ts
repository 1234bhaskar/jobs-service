import { execSync } from 'node:child_process';
import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter migration name: ', (name) => {
    if (!name || name.trim() === '') {
        console.error('❌ Error: Migration name is required');
        rl.close();
        process.exit(1);
    }

    try {
        const sanitizedName = name.trim().replace(/\s+/g, '_').toLowerCase();
        console.log(`\n⏳ Generating migration: ${sanitizedName}...`);

        // Check if migrations folder exists, if not create it with initial structure
        const migrationsDir = path.resolve('./migrations');
        const metaDir = path.join(migrationsDir, 'meta');
        const journalFile = path.join(metaDir, '_journal.json');

        if (!fs.existsSync(journalFile)) {
            console.log('Initializing migrations folder structure...');
            fs.mkdirSync(metaDir, { recursive: true });
            fs.writeFileSync(
                journalFile,
                JSON.stringify(
                    {
                        version: '7',
                        dialect: 'postgresql',
                        entries: []
                    },
                    null,
                    2
                )
            );
        }

        // Generate the migration using drizzle-kit
        execSync(`npx drizzle-kit generate --name ${sanitizedName}`, { stdio: 'inherit' });

        console.log('\n⏳ Applying schema changes...');
        // Use db:push to safely apply changes (handles existing objects gracefully)
        execSync('npx drizzle-kit push', { stdio: 'inherit' });

        console.log('\n✅ All steps completed successfully!');
    } catch (error) {
        console.error('\n❌ Workflow failed.');
        process.exit(1);
    } finally {
        rl.close();
    }
});
