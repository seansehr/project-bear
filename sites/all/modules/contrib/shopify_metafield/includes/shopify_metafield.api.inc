<?php
/**
 * @file
 * Contains functions for working with the Shopify API.
 */

/**
 * Get Shopify metafields from the API.
 *
 * @param array $options
 *   Arguments to pass to the API.
 *
 * @return array
 *   Returns the API response data.
 *
 * @throws \ShopifyApiException
 */
function shopify_metafield_api_get_metafields(array $options = array()) {
  return shopify_api_call('GET', 'metafields', $options);
}
