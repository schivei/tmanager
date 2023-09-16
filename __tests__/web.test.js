import { default as insertTasks } from "../commands/insert.js";
import { default as daemon } from "../commands/daemon.js";
import { default as clearTasks } from "../commands/clear.js";
import supertest from "supertest";

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

let app;
beforeAll(async () => {
    app = await daemon();

    await new Promise(resolve => setTimeout(resolve, 1000));
});

afterAll(() => {
    app.server.close();
    await clearTasks();
});

describe('web api', () => {
    beforeEach(async () => {
        await clearTasks();
    });

    test('get tasks', async () => {
        const size = await insertTasks(tasks);

        await supertest(app.server)
            .get('/get-tasks')
            .set('Accept', 'application/json')
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .then(response => {
                expect(response.body.length).toBe(size);
            });
    });

    test('insert tasks', async () => {
        await supertest(app.server)
            .post('/insert-tasks')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(tasks))
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect('"inserted 3 tasks"');
    });
});
