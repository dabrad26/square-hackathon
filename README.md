# Square Hackathon Photo Wall

## Getting Started

### Initial setup

- Clone the projexr and `cd` into the project. 
- Run `npm ci` to install dependencies.
- Use the command below based on use case. 

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

## API Server

### GET /photo-wall/menu.php

Proxy of Square API /catalog/list

### GET /photo-wall/reviews

Retrieve saved reviews from local Database

### POST /photo-wall/reviews

Data is ReviewItem. Returns ReviewItem (with DB ID)

### GET /photo-wall/receipt.php?id=${id}

ID of an Order.  Proxy of Square API /orders/{order_id}
