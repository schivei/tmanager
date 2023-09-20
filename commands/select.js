import { tasks } from "../tasks.js";

export default async function (filter) {
    let snapshot;
    
    if (!filter) {
        snapshot = await tasks.get();
    } else {
        const tryNumber = parseInt(filter.value);
        let value = filter.value;

        if (!isNaN(tryNumber)) {
            value = tryNumber;
        }

        snapshot = await tasks.where(filter.field, '==', value).get();
    }

    const data = [];

    snapshot.forEach(doc => {
        const task = doc.data();

        task.id = doc.id;

        data.push(task);
    });

    return data;
}
