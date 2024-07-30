# Burrito Shop

You are to create a backend API to support your burrito shop's point of sales and ordering
system. You should focus on those APIs necessary to enable a front end client supporting
customers ordering burritos.

The following entities should be created, with proper relationships (with example attributes):
- burrito - has a name, size, and price ("Chicken Burrito", "regular, $3", "XL, $5")
- order - has items and total cost
- order item - burrito and quantity

The following endpoints should return a JSON response:
- /api/burrito (list of burrito products)
- /api/orders - a list of orders, submit an order
- /api/orders/id - details of an individual order

Requirements:
- The backend should be in either Typescript or JavaScript, using the NodeJS runtime
- Time requirement: EOD Thursday (submit what you have at that time)

Bonus:
- burritos have options (say black olives, rice or sour cream)
- authentication (say api key for simplicity)
- use of Solana or Ethereum (no specification on how that might be used)
- unit tests

Delivery Requirements:
- GitHub repository link
- README with instructions to build, run, and test (e.g. via Postman) your entry
- The backend may be deployed on a cloud provider or run locally as a Docker container
