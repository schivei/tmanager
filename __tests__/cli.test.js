// test insert tasks with jest
import { default as insertTasks } from "../commands/insert.js";
import { default as selectTasks } from "../commands/select.js";
import { default as fileTasks } from "../commands/file.js";
import { default as clearTasks } from "../commands/clear.js";

// sample data
const tasks = [
    {
        "description": "Criar Login",
        "responsable": "bruno",
        "status": "done"
    },
    {
        "description": "Criar Menu",
        "responsable": "bruno",
        "status": "doing"
    },
    {
        "description": "Criar tela de perfil",
        "responsable": "bruno",
        "status": "todo"
    }
];

afterAll(async () => {
    await clearTasks();
});

describe('insert tasks', () => {
    beforeEach(async () => {
        await clearTasks();
    });

    test('insert tasks', async () => {
        const result = await insertTasks(tasks);
        expect(result).toBe(3);

        const data = await selectTasks();
        expect(data.length).toBe(3);
    });

    test('insert tasks with file', async () => {
        const result = await fileTasks('./__tests__/tasks.json');
        expect(result).toBe(3);

        const data = await selectTasks();
        expect(data.length).toBe(3);
    });
});