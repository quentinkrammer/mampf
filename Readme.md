# Run the project:

- Install Node (was developed in v18.16.01)
- start backend `cd backend; npm install; npm run dev` or `cd backend; pnpm install; pnpm dev`
- start frontend `cd frontend; npm install; npm run dev` or `cd frontend; pnpm install; pnpm dev`
- go to [localhost:5173](http://localhost:5173)
- on the bottom left you find two butttons to reset the DB and inject test data
- test data is located in 'backend\src\mockDb.ts'

# Aufgabe: Beschreibe, wie die App regelmäßig Aktualisierungen vom Server erhalten kann. Welche Techniken/Methoden gibt es?

1. Polling

- Client sendet Requests in regelmässigem Zeitintervall

2. Long Polling:

- Client sendet request auf Ressource, Server antwortet erst wenn Ressource vorhanden ist
- Nach Antwort des Servers ist die Verbindung geschlossen
- Um nun einen neuen long-poll-request zu starten, bedarf es eigener Logik

3. Websocket

- bidirektionale Kommunikation
- Verbindung ist persistent

4. Server Send Event

- unidirektional (Server sendet an Client)
- persistent
