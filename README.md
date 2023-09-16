# tmanager

[![Node.js Tests](https://github.com/schivei/tmanager/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/schivei/tmanager/actions/workflows/npm-publish.yml)

## Prepare

### Install dependencies
```bash
npm i
```

if on linux, make tmanager executable
```bash
chmod +x tmanager
```

on windows with powershell
```bash
.\tmanager
```

### Configure Firebase Admin
Alter the file `firebase-admin.json` with your firebase admin credentials.

### Run tests
```bash
npm test
```

## CLI commands

### Inserts

#### Inline
```bash
tmanager -i '[{\"description\":\"Criar Login\",\"responsable\":\"bruno\",\"status\":\"done\"}, {\"description\":\"Criar Menu\",\"responsable\":\"bruno\",\"status\":\"doing\"}, {\"description\":\"Criar tela de perfil\",\"responsable\":\"bruno\",\"status\":\"todo\"}]'
```
or
```bash
tmanager --insert '[{\"description\":\"Criar Login\",\"responsable\":\"bruno\",\"status\":\"done\"}, {\"description\":\"Criar Menu\",\"responsable\":\"bruno\",\"status\":\"doing\"}, {\"description\":\"Criar tela de perfil\",\"responsable\":\"bruno\",\"status\":\"todo\"}]'
```

#### File
```bash
tmanager -f /path/to/file.json
```
or
```bash
tmanager --file /path/to/file.json
```

### List
```bash
tmanager -s
```
or
```bash
tmanager --select
```

### Clear
```bash
tmanager -c
```
or
```bash
tmanager --clear
```

### Web Daemon
```bash
tmanager -d
```
or
```bash
tmanager --daemon
```

## API

### Inserts
```bash
curl -X POST \
  http://localhost:3000/insert-tasks \
  -H 'Content-Type: application/json' \
  -d '[{"description":"Criar Login","responsable":"bruno","status":"done"}, {"description":"Criar Menu","responsable":"bruno","status":"doing"}, {"description":"Criar tela de perfil","responsable":"bruno","status":"todo"}]'
```

### List
```bash
curl -X GET \
  http://localhost:3000/get-tasks \
  -H 'Content-Type: application/json'
```