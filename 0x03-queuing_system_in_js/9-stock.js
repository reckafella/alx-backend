import exp from "constants";
import express from "express";
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;
const hostname = '0.0.0.0';

/* create a redis client */
const client = redis.createClient();

/* promisify redis commands */
const set = promisify(client.SET).bind(client);
const get = promisify(client.GET).bind(client);

function reserveStockById(itemId, stock) {
  return set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  return get(`item.${itemId}`);
}

/* product functions */
const listProducts = [
  {
    itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4,
  },
  {
    itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10,
  },
  {
    itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2,
  },
  {
    itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5,
  }
];

const getItemById = (id) => {
  return listProducts.find(product => product.id === id);
};

/* Express server */
app.get('/', (_request, response) => response.send('Hello, World!'));

app.get('/list_products', (_request, response) => {
  response.json(listProducts);
});

app.get('/list_products/:itemId(\\d+)', (request, response) => {
  const { itemId } = parseInt(request.params);
  const item = getItemById(itemId);

  if (!item) {
    response.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(itemId)
    .then((result) => {
      parseInt(result)
    })
    .then((reservedStock) => {
      item.currentQuantity = item.initialAvailableQuantity - (reservedStock || 0);
      response.json(item);
    });
});

app.get('/reserve_product/:itemId(\\d+)', (request, response) => {
  const { itemId } = parseInt(request.params);
  const item = getItemById(itemId);

  if (!item) {
    response.json({ status: 'Product not found' });
    return;
  }
  getCurrentReservedStockById(itemId)
    .then((result) => {
      Number.parseInt(result || 0)
    })
    .then((reservedStock) => {
      if (reservedStock >= item.initialAvailableQuantity) {
        response.json({ status: 'Not enough stock available', itemId });
        return;
      }
      reserveStockById(itemId, reservedStock + 1)
        .then(() => response.json({ status: 'Reservation confirmed', itemId }));
    });
});

const resetProductsStock = () => Promise.all(listProducts.map(item => set(`item.${item.itemId}`, 0)))

app.listen(port, hostname, () => {
  resetProductsStock()
    .then(() => {
      console.log(`Server running on http://${hostname}:${port}`);
    })
});

export default app;
