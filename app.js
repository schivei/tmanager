import * as cmd from "commander";
import { insertData, selectData, fileData, webDaemon, clearData } from "./commands/index.js";

const commander = cmd.createCommand();

const options = commander
    .version('0.2.0', '-v, --version')
    .usage('<OPTION>')
    .option('-d, --daemon', 'Run Web Daemon')
    .option('-i, --insert <value>', 'Insert data to database')
    .option('-s, --select', 'Select data from database')
    .option('--filter <value>', 'Selection data filter')
    .option('-f, --file <path>', 'File to be processed')
    .option('-c, --clear', 'Clear database')
    .parse(process.argv)
    .opts();

const { daemon, insert, select, filter, file, clear } = options;

if (daemon) {
    console.log('Run Web Daemon');
    const app = webDaemon();
    app.server.listen(app.port);
} else if (insert) {
    console.log('Insert data to database');
    const data = JSON.parse(insert);
    const size = await insertData(data);
    console.log(`Inserted ${size} rows`);
} else if (select) {
    let selectionArgs;
    if (filter && filter.indexOf('=') > 0) {
        selectionArgs = {
            field: filter.split('=')[0],
            value: filter.split('=')[1]
        };
    }

    console.log('Select data from database');
    const data = await selectData(selectionArgs);
    console.log(`Selected ${data.length} rows`);
    console.table(data);
} else if (file) {
    console.log('File to be processed');
    const size = await fileData(file);
    console.log(`Inserted ${size} rows`);
} else if (clear) {
    console.log('Clear database');
    const size = await clearData();
    console.log(`Deleted ${size} rows`);
} else {
    console.log('No command specified');
    commander.outputHelp();
}
