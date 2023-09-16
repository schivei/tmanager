import { default as getTasks } from "./get-tasks.js";
import { default as insertTasks } from "./insert-tasks.js";

export default function (app) {
    getTasks(app);
    insertTasks(app);
}