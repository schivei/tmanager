import { tasks, db } from "../tasks.js";

async function clear() {
    const docs = tasks.listDocuments();
    docs.then(async val => {
        const chunks = [];
        for (let i = 0; i < val.length; i += 1000) {
            chunks.push(val.slice(i, i + 1000));
        }

        for (const chunk of chunks) {
            const batch = db.batch();
            chunk.map((document) => {
                batch.delete(document);
            });
            await batch.commit();
        }
    });

    return await docs;
}

export default async function () {
    const snapshot = await clear();

    return snapshot.length;
}