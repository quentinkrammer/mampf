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
