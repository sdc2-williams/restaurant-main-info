# Food Finder

## Related Projects

- https://github.com/sdc2-williams/nearby-carousel
- https://github.com/sdc2-williams/menu-items

## Table of Contents

1. [Setup (local)](#setup-local)
1. [Usage (local)](#usage-local)
1. [API](#api)

## Setup (local)

1. Install dependencies: `npm install`
2. Build code: `npm run build`
3. Make sure you have MongoDB installed and running.
4. Seed database: `npm run seed`
5. Start server: `npm start`

## Usage (local)

Once setup is complete, the app can be accessed at  `http://localhost:2000/<ID>/`.

## API

### GET /api/restaurant/:id

Responds with JSON of the restaurant with id `:id`.

### GET /api/restaurant/name/:name

Responds with JSON of the restaurant with name `:name`.

### POST /api/restaurant

Takes a JSON object of a restaurant. Responds with JSON of the restaurant.

### PUT /api/restaurant/:id

Accepts a JSON object containing the properties of the restaurant of id `id` to update. Responds with JSON of the updated restaurant.

### DELETE /api/restaurant/:id

Deletes the restaurant with id `:id`. Responds with JSON of the deleted restaurant.
