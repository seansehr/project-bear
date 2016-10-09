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
          'weight' => '8',
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

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_shopify_brands_pattern';
  $strongarm->value = 'brands/[term:name]';
  $export['pathauto_taxonomy_term_shopify_brands_pattern'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_shopify_categories_pattern';
  $strongarm->value = 'categories/[term:name]';
  $export['pathauto_taxonomy_term_shopify_categories_pattern'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_shopify_licences_pattern';
  $strongarm->value = 'licenses/[term:name]';
  $export['pathauto_taxonomy_term_shopify_licences_pattern'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_shopify_scales_pattern';
  $strongarm->value = 'scales/[term:name]';
  $export['pathauto_taxonomy_term_shopify_scales_pattern'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'rr_config';
  $strongarm->value = array(
    'field_collection_item' => array(
      'enable' => 0,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
        'token' => 0,
      ),
    ),
    'node' => array(
      'enable' => 0,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
        'teaser' => 0,
        'rss' => 0,
        'search_index' => 0,
        'search_result' => 0,
        'token' => 0,
      ),
    ),
    'shopify_product' => array(
      'enable' => 1,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
        'teaser' => 0,
        'search_index' => 0,
        'search_result' => 0,
        'token' => 0,
      ),
    ),
    'shopify_metafield' => array(
      'enable' => 0,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
      ),
    ),
    'file' => array(
      'enable' => 0,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
        'teaser' => 0,
        'preview' => 0,
        'rss' => 0,
        'search_index' => 0,
        'search_result' => 0,
        'token' => 0,
      ),
    ),
    'taxonomy_term' => array(
      'enable' => 0,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
        'token' => 0,
      ),
    ),
    'user' => array(
      'enable' => 0,
      'max_record' => '10',
      'view_mode' => array(
        'full' => 'full',
        'token' => 0,
      ),
    ),
  );
  $export['rr_config'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'shopify_enhancements_returns';
  $strongarm->value = array(
    'value' => '<p>Returns or Exchanges may be done within 14 days from purchase date. We kindly ask that all valid returns must be in unworn condition with attached tags and packaging. HAVEN will not accept any returned merchandise without prior written communication and valid Return Authorization Number&sup1;. Upon inspection and approval, Exchange or Store Credit will be provided, No Refunds. All sale items, discounted and promotional merchandise, including any discount/promo codes used are FINAL SALE and are ineligible to be returned or exchanged. HAVEN does not accept or assume any responsibility for loss of or damage to returned goods whilst in transit from the customer. It is therefore strongly recommended customers use an appropriate carrier with a tracking or trace system.</p><p>All charges incurred as the result of an exchange or return (ie. shipping, duties, and taxes) are the customer&rsquo;s responsibility. In the case of an exchange the customer will be required to pay an additional re-shipping fee.</p><p>It is the customer&rsquo;s responsibility to ensure the accuracy and correctness of the shipment, as well as the responsibility to oversee the product(s) are packaged and delivered in tact, unworn and in original purchased condition (with all tags still attached). If any matters of liability arise, the matter will be dealt with and settled between the seller and the customer directly. The terms and conditions of the respective seller will apply.</p>',
    'format' => 'full_html',
  );
  $export['shopify_enhancements_returns'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'shopify_enhancements_shipping';
  $strongarm->value = array(
    'value' => '<p>International Custom Duties &ndash;&nbsp;Please note, International orders may be charged customs fees by the destination county&rsquo;s government. We have no control over if, and how much you are charged for customs. We are not responsible for any additional charges the destination country imposes on you.&nbsp;Due to the customs process delivery times are estimates and may take longer than stated.</p><p>Shipping and Handling Costs &ndash;&nbsp;Shipping and handling costs depend on the size of the order. All Canadian and U.S. orders are trackable. International shipping options include Tracked Packet International (where available) and International Xpresspost. Here are the breakdowns for domestic and international shipping prices.</p>',
    'format' => 'full_html',
  );
  $export['shopify_enhancements_shipping'] = $strongarm;

  return $export;
}
