import { tasks } from "../tasks.js";

export default async function () {
    const snapshot = await tasks.get();

    const data = [];

    snapshot.forEach(doc => {
        const task = doc.data();

        task.id = doc.id;

        data.push(task);
    });

    return data;
}
