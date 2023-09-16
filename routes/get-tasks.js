import { default as selectData } from "../commands/select.js";
import createError from 'http-errors';

export default function (app) {
    app.get('/get-tasks', async function (_, res, next) {
        try {
            const data = await selectData();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            next(createError(500, error.message));
        }
    });
}
