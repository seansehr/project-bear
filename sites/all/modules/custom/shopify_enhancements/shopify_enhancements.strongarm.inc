<?php
/**
 * @file
 * shopify_enhancements.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function shopify_enhancements_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_shopify_product__shopify_product';
  $strongarm->value = array(
    'view_modes' => array(
      'full' => array(
        'custom_settings' => FALSE,
      ),
      'teaser' => array(
        'custom_settings' => TRUE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
      ),
      'search_index' => array(
        'custom_settings' => FALSE,
      ),
      'search_result' => array(
        'custom_settings' => FALSE,
      ),
    ),
    'extra_fields' => array(
      'form' => array(
        'metatags' => array(
          'weight' => '3',
        ),
        'path' => array(
          'weight' => '7',
        ),
      ),
      'display' => array(
        'product_id' => array(
          'default' => array(
            'weight' => '31',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '31',
            'visible' => FALSE,
          ),
        ),
        'variant_id' => array(
          'default' => array(
            'weight' => '30',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '30',
            'visible' => FALSE,
          ),
        ),
        'body_html' => array(
          'default' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
        ),
        'price' => array(
          'default' => array(
            'weight' => '11',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
        ),
        'updated_at' => array(
          'default' => array(
            'weight' => '23',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '22',
            'visible' => FALSE,
          ),
        ),
        'created_at' => array(
          'default' => array(
            'weight' => '26',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '26',
            'visible' => FALSE,
          ),
        ),
        'published_at' => array(
          'default' => array(
            'weight' => '25',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '25',
            'visible' => FALSE,
          ),
        ),
        'title' => array(
          'default' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '9',
            'visible' => FALSE,
          ),
        ),
        'handle' => array(
          'default' => array(
            'weight' => '14',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '13',
            'visible' => FALSE,
          ),
        ),
        'product_type' => array(
          'default' => array(
            'weight' => '12',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '11',
            'visible' => FALSE,
          ),
        ),
        'published_scope' => array(
          'default' => array(
            'weight' => '27',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '27',
            'visible' => FALSE,
          ),
        ),
        'vendor' => array(
          'default' => array(
            'weight' => '28',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '28',
            'visible' => FALSE,
          ),
        ),
        'barcode' => array(
          'default' => array(
            'weight' => '29',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '29',
            'visible' => FALSE,
          ),
        ),
        'compare_at_price' => array(
          'default' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '24',
            'visible' => FALSE,
          ),
        ),
        'fulfillment_service' => array(
          'default' => array(
            'weight' => '24',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '23',
            'visible' => FALSE,
          ),
        ),
        'grams' => array(
          'default' => array(
            'weight' => '17',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '16',
            'visible' => FALSE,
          ),
        ),
        'inventory_management' => array(
          'default' => array(
            'weight' => '16',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '15',
            'visible' => FALSE,
          ),
        ),
        'inventory_policy' => array(
          'default' => array(
            'weight' => '15',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '14',
            'visible' => FALSE,
          ),
        ),
        'inventory_quantity' => array(
          'default' => array(
            'weight' => '18',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '17',
            'visible' => FALSE,
          ),
        ),
        'requires_shipping' => array(
          'default' => array(
            'weight' => '19',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '18',
            'visible' => FALSE,
          ),
        ),
        'sku' => array(
          'default' => array(
            'weight' => '22',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '21',
            'visible' => FALSE,
          ),
        ),
        'taxable' => array(
          'default' => array(
            'weight' => '21',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '20',
            'visible' => FALSE,
          ),
        ),
        'weight' => array(
          'default' => array(
            'weight' => '20',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '19',
            'visible' => FALSE,
          ),
        ),
        'weight_unit' => array(
          'default' => array(
            'weight' => '13',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '12',
            'visible' => FALSE,
          ),
        ),
        'add_to_cart' => array(
          'default' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_shopify_product__shopify_product'] = $strongarm;

  return $export;
}
