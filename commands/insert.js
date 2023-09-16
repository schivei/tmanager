import { tasks, db } from "../tasks.js";

function insert(task, transaction) {
    let id = task.id;
    delete task.id;

    let doc;

    if (id) {
        doc = tasks.doc(id.toString());
    } else {
        doc = tasks.doc();
    }

    task.computer = process.env.COMPUTERNAME;

    transaction.set(doc, task);
}

export default async function (data) {
    const transaction = db.batch();

    try {
        data.forEach(task => {
            insert(task, transaction);
        });

        await transaction.commit();

        return data.length;
    } catch (error) {
        throw error;
    }
}
