const { createAdminApiClient } = require('@shopify/admin-api-client');
const dotenv = require('dotenv');

// Load environment variables from .env file if present
dotenv.config();

class ShopifyAdminAPI {
    static client = createAdminApiClient({
        storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
        apiVersion: process.env.SHOPIFY_API_VERSION,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    });

    static async getProduct(id) {
        const operation = `
        query ProductQuery($id: ID!) {
          product(id: $id) {
            id
            title
            handle
          }
        }
      `;

        const { data, errors, extensions } = await ShopifyAdminAPI.client.request(operation, {
            variables: {
                id: `gid://shopify/Product/${id}`,
            },
        });
        console.log(data);
        return data;
    }
}

module.exports = ShopifyAdminAPI;
