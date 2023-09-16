import admin from "firebase-admin";
import "firebase-admin/firestore";
import { promises as fs } from 'fs'
import { join } from "path";
import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const serviceAccount = JSON.parse(await fs.readFile(join(__dirname, "firebase-admin.json"), 'utf8'));

if (!serviceAccount.private_key_id) {
    serviceAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;

    if (!serviceAccount.private_key_id) {
        throw new Error('Missing private key id')
    }
}

if (!serviceAccount.private_key) {
    serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    if (!serviceAccount.private_key) {
        throw new Error('Missing private key')
    }
}

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = app.firestore();

app.auth();

const tasks = db.collection('tasks');
db.settings({ ignoreUndefinedProperties: true });

export { tasks, db };