import { default as insertData } from "./insert.js";
import fs from 'fs';

export default async function (jsonFile) {
    const tasks = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

    return await insertData(tasks);
}