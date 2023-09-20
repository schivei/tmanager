import { default as selectData } from "../commands/select.js";
import createError from 'http-errors';

export default function (app) {
    app.get('/get-tasks', async function (req, res, next) {
        try {
            // get field and value from query string
            const field = req.query.field;
            const value = req.query.value;

            let selectionArgs = null;

            if (field && value) {
                selectionArgs = {
                    field,
                    value
                };
            }

            const data = await selectData(selectionArgs);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            next(createError(500, error.message));
        }
    });
}
