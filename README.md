Beer API

live version: https://beerapi-wgf2.onrender.com/
live version swagger doc: https://beerapi-wgf2.onrender.com/api-docs/

Documentatie Deployment:

Heb mijn deployment gedaan via render: 

![alt text](image.png)

Dan maak je een nieuwe Web Service:

![alt text](image-1.png)

En dan connect je de github en deploy je de github:

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-8.png)

Om connectie te hebben met MongoDB heb je een aantal stappen te doen:

In MongoDB Atlas > Network Access: Voeg de 3 outbound ips toe, deze kan je vinden hier: 

![alt text](image-5.png)

![alt text](image-6.png)

En in Render moet je nog jouw username en password van je mongodb connection string meegeven in de Environment:

![alt text](image-7.png)




Deze API biedt eindpunten voor het beheren van data met betrekking tot bieren, waaronder gebruikers en brouwerijen

Authenticatie

Om toegang te krijgen tot bepaalde eindpunten is authenticatie vereist. Authenticatie wordt geïmplementeerd met behulp van JSON Web Tokens (JWT). Gebruikers kunnen een JWT-token verkrijgen door een account te registreren en in te loggen.

alle POST - PATCH - PUT - DELETE routes van deze api verwachten een jwt token in het header met naam x-auth-token !
Routes
    
Gebruikers

Eindpunten met betrekking tot gebruikersbeheer.
Routes

    GET /api/users - Informatie over all user ophalen.
    GET /api/users/:id - Informatie over de huidige gebruiker ophalen.
    POST /api/users - Create een nieuwe user.
    PATCH /api/users/:id - Gebruikersinformatie bijwerken.
    PUT /api/users/:id - Gebruikersinformatie bijwerken.
    DELETE /api/users/:id - Gebruikersaccount verwijderen.

Beers

Eindpunten voor het beheren van Beers.
Routes

    POST /api/beers - Maak een nieuwe beer.
    GET /api/beers - Alle beers ophalen.
    GET /api/beers/:id - Een beer opvragen op basis van ID.
    PATCH /api/beers/:id - Een beer gedeeltelijk bijwerken op basis van ID.
    PUT /api/beers/:id - Een beer volledig bijwerken op basis van ID.
    DELETE /api/beers/:id - Een beer verwijderen op basis van ID.

Breweries

Eindpunten voor het beheren van Breweries.
Routes

    POST /api/breweries - Maak een nieuw brewery aan.
    GET /api/breweries - Alle breweries ophalen.
    GET /api/breweries/:id - Een brewery opvragen op basis van ID.
    PATCH /api/breweries/:id - Een brewery gedeeltelijk bijwerken op basis van ID.
    PUT /api/breweries/:id - Een brewery volledig bijwerken op basis van ID.
    DELETE /api/breweries/:id - Een brewery verwijderen op basis van ID
