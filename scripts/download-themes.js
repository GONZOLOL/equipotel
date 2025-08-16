const fs = require('fs');
const path = require('path');
const https = require('https');

const themes = [
    {
        name: 'lara-light-blue',
        url: 'https://unpkg.com/primereact@10.9.6/resources/themes/lara-light-blue/theme.css',
    },
    {
        name: 'lara-dark-blue',
        url: 'https://unpkg.com/primereact@10.9.6/resources/themes/lara-dark-blue/theme.css',
    },
];

const publicDir = path.join(__dirname, '../public');
const themesDir = path.join(publicDir, 'themes');

// Create themes directory if it doesn't exist
if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
}

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);

        https
            .get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(
                        new Error(`Failed to download: ${response.statusCode}`)
                    );
                    return;
                }

                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    console.log(`✅ Downloaded: ${path.basename(filepath)}`);
                    resolve();
                });
            })
            .on('error', (err) => {
                fs.unlink(filepath, () => {}); // Delete the file async
                reject(err);
            });
    });
}

async function downloadThemes() {
    console.log('🚀 Downloading PrimeReact themes...');

    for (const theme of themes) {
        const themeDir = path.join(themesDir, theme.name);

        if (!fs.existsSync(themeDir)) {
            fs.mkdirSync(themeDir, { recursive: true });
        }

        const filepath = path.join(themeDir, 'theme.css');

        try {
            await downloadFile(theme.url, filepath);
        } catch (error) {
            console.error(`❌ Error downloading ${theme.name}:`, error.message);
        }
    }

    console.log('✨ Theme download completed!');
}

downloadThemes().catch(console.error);
