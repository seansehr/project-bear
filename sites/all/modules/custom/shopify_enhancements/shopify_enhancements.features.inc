<?php
/**
 * @file
 * shopify_enhancements.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function shopify_enhancements_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "flexslider" && $api == "flexslider_default_preset") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function shopify_enhancements_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function shopify_enhancements_image_default_styles() {
  $styles = array();

  // Exported image style: product_list.
  $styles['product_list'] = array(
    'label' => 'Product List',
    'effects' => array(
      3 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 600,
          'height' => 500,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_default_search_api_index().
 */
function shopify_enhancements_default_search_api_index() {
  $items = array();
  $items['products'] = entity_import('search_api_index', '{
    "name" : "products",
    "machine_name" : "products",
    "description" : null,
    "server" : "local",
    "item_type" : "shopify_product",
    "options" : {
      "index_directly" : 0,
      "cron_limit" : "50",
      "fields" : {
        "body_html" : { "type" : "text" },
        "compare_at_price" : { "type" : "decimal", "boost" : "0.2" },
        "field_shopify_category_reference:name" : { "type" : "text", "boost" : "0.5" },
        "field_shopify_licence_reference:name" : { "type" : "text", "boost" : "0.5" },
        "field_shopify_scale_reference:name" : { "type" : "text", "boost" : "0.5" },
        "price" : { "type" : "decimal" },
        "product_type" : { "type" : "text" },
        "search_api_language" : { "type" : "string" },
        "shopify_product_collections:name" : { "type" : "list\\u003Ctext\\u003E", "boost" : "0.5" },
        "shopify_product_metafields:value" : { "type" : "list\\u003Ctext\\u003E", "boost" : "0.5" },
        "shopify_product_tags:description" : { "type" : "list\\u003Ctext\\u003E" },
        "shopify_product_tags:name" : { "type" : "list\\u003Ctext\\u003E" },
        "sku" : { "type" : "text", "boost" : "0.5" },
        "title" : { "type" : "text", "boost" : "3.0" },
        "vendor" : { "type" : "text", "boost" : "2.0" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_add_hierarchy" : { "status" : 0, "weight" : "0", "settings" : { "fields" : [] } },
        "search_api_alter_add_viewed_entity" : { "status" : 0, "weight" : "0", "settings" : { "mode" : "full" } },
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] }
      },
      "processors" : {
        "search_api_case_ignore" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : {
              "title" : true,
              "product_type" : true,
              "vendor" : true,
              "sku" : true,
              "body_html" : true,
              "shopify_product_tags" : true,
              "shopify_product_collections" : true,
              "field_shopify_category_reference" : true,
              "field_shopify_licence_reference" : true,
              "search_api_language" : true
            }
          }
        },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : {
              "title" : true,
              "product_type" : true,
              "vendor" : true,
              "sku" : true,
              "body_html" : true
            },
            "title" : 0,
            "alt" : 1,
            "tags" : "h1 = 5\\r\\nh2 = 3\\r\\nh3 = 2\\r\\nstrong = 2\\r\\nb = 2\\r\\nem = 1.5\\r\\nu = 1.5"
          }
        },
        "search_api_tokenizer" : {
          "status" : 0,
          "weight" : "20",
          "settings" : {
            "fields" : {
              "title" : true,
              "product_type" : true,
              "vendor" : true,
              "sku" : true,
              "body_html" : true
            },
            "spaces" : "[^[:alnum:]]",
            "ignorable" : "[\\u0027]"
          }
        },
        "search_api_stopwords" : {
          "status" : 0,
          "weight" : "30",
          "settings" : {
            "fields" : {
              "title" : true,
              "product_type" : true,
              "vendor" : true,
              "sku" : true,
              "body_html" : true
            },
            "file" : "",
            "stopwords" : "but\\r\\ndid\\r\\nthe this that those\\r\\netc"
          }
        },
        "search_api_highlighting" : {
          "status" : 0,
          "weight" : "35",
          "settings" : {
            "prefix" : "\\u003Cstrong\\u003E",
            "suffix" : "\\u003C\\/strong\\u003E",
            "excerpt" : 1,
            "excerpt_length" : "256",
            "exclude_fields" : [],
            "highlight" : "always"
          }
        }
      }
    },
    "enabled" : "1",
    "read_only" : "0",
    "rdf_mapping" : []
  }');
  return $items;
}

/**
 * Implements hook_default_search_api_server().
 */
function shopify_enhancements_default_search_api_server() {
  $items = array();
  $items['local'] = entity_import('search_api_server', '{
    "name" : "local",
    "machine_name" : "local",
    "description" : "Using local db.",
    "class" : "search_api_db_service",
    "options" : {
      "database" : "default:default",
      "min_chars" : "3",
      "partial_matches" : 1,
      "indexes" : {
        "default_node_index" : {
          "type" : {
            "table" : "search_api_db_default_node_index",
            "column" : "type",
            "type" : "string",
            "boost" : "1.0"
          },
          "title" : {
            "table" : "search_api_db_default_node_index_text",
            "type" : "text",
            "boost" : "5.0"
          },
          "promote" : {
            "table" : "search_api_db_default_node_index",
            "column" : "promote",
            "type" : "boolean",
            "boost" : "1.0"
          },
          "sticky" : {
            "table" : "search_api_db_default_node_index",
            "column" : "sticky",
            "type" : "boolean",
            "boost" : "1.0"
          },
          "created" : {
            "table" : "search_api_db_default_node_index",
            "column" : "created",
            "type" : "date",
            "boost" : "1.0"
          },
          "changed" : {
            "table" : "search_api_db_default_node_index",
            "column" : "changed",
            "type" : "date",
            "boost" : "1.0"
          },
          "author" : {
            "table" : "search_api_db_default_node_index",
            "column" : "author",
            "type" : "integer",
            "boost" : "1.0"
          },
          "search_api_language" : {
            "table" : "search_api_db_default_node_index",
            "column" : "search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "body:value" : {
            "table" : "search_api_db_default_node_index_text",
            "type" : "text",
            "boost" : "1.0"
          }
        },
        "products" : {
          "title" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "3.0"
          },
          "product_type" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "vendor" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "2.0"
          },
          "sku" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "0.5"
          },
          "body_html" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "1.0"
          },
          "search_api_language" : {
            "table" : "search_api_db_products",
            "column" : "search_api_language",
            "type" : "string",
            "boost" : "1.0"
          },
          "shopify_product_tags:name" : {
            "table" : "search_api_db_products_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "shopify_product_tags:description" : {
            "table" : "search_api_db_products_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "1.0"
          },
          "compare_at_price" : {
            "table" : "search_api_db_products",
            "column" : "compare_at_price",
            "type" : "decimal",
            "boost" : "0.2"
          },
          "price" : {
            "table" : "search_api_db_products",
            "column" : "price",
            "type" : "decimal",
            "boost" : "1.0"
          },
          "field_shopify_category_reference:name" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "0.5"
          },
          "shopify_product_collections:name" : {
            "table" : "search_api_db_products_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "0.5"
          },
          "shopify_product_metafields:value" : {
            "table" : "search_api_db_products_text",
            "type" : "list\\u003Ctext\\u003E",
            "boost" : "0.5"
          },
          "field_shopify_licence_reference:name" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "0.5"
          },
          "field_shopify_scale_reference:name" : {
            "table" : "search_api_db_products_text",
            "type" : "text",
            "boost" : "0.5"
          }
        }
      }
    },
    "enabled" : "1",
    "rdf_mapping" : []
  }');
  return $items;
}
