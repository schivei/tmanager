import { default as insertData } from "../commands/insert.js";
import createError from 'http-errors';
import bodyParser from 'body-parser';

export default function (app) {
    app.post('/insert-tasks', bodyParser.json(), async function (req, res, next) {
        try {
            await insertData(req.body);

            res.status(200).json(`inserted ${req.body.length} tasks`);
        } catch (error) {
            console.error(error);
            next(createError(500, error.message));
        }
    });
};
