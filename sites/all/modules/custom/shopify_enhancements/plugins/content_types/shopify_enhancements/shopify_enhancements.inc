<?php

/**
 * @file
 * A ctools content type used to provide content in panes.
 */

/**
 * Implements ctools content type plugin definition.
 */
$plugin = array(
  'title' => t('Product List'),
  'description' => t('Displays products.'),
  'single' => TRUE,
  'render callback' => 'shopify_enhancements_render',
  'edit form' => 'shopify_enhancements_edit_form',
  'icon' => 'shopify_enhancements_icon.png',
  'category' => array('Shopify'),
  'admin info' => 'shopify_enhancements_admin_info',
  'no title override' => TRUE,
  // 'available sizes' => array(WIDGET_SIZE_SMALL, WIDGET_SIZE_MEDIUM, WIDGET_SIZE_LARGE),
  'all contexts' => TRUE,
);

/**
 * Implements ctools content type render callback.
 */
function shopify_enhancements_render($subtype, $conf, $args, $contexts) {
  $block = new stdClass();
  $block->title = NULL;

  $source = isset($conf['source']) ? $conf['source'] : 'context';
  $query = '';
  $category_map = '';
  $ids = $conf['ids'];

  if ($source !== 'custom') {
    $ids = array();
    $fields = array_filter(field_info_instances('shopify_product', 'shopify_product'), function ($n) {
      return (isset($n['widget']['module']) && $n['widget']['module'] == 'taxonomy');
    });
    $fields = array_map(function ($info) {
      $field = field_info_field($info['field_name']);
      return array_map(function ($n) {
        return $n['vocabulary'];
      }, $field['settings']['allowed_values']);
    }, $fields);

    foreach ($contexts as $key => $value) {
      if ($value->keyword == 'term' && $tax = taxonomy_term_load($value->argument)) {
        foreach ($fields as $field_name => $terms) {
          if (in_array($tax->vocabulary_machine_name, $terms)) {
            $category_map = $tax->vocabulary_machine_name;

            $query = new EntityFieldQuery();
            $query->entityCondition('entity_type', 'shopify_product')
              ->fieldCondition($field_name, 'tid', $tax->tid, '=');

            $result = $query->execute();
            if (isset($result['shopify_product'])) {
              $ids = array_keys($result['shopify_product']);
            }
          }
        }
      }
    }
  }

  if (empty($ids)) {
    $block->content = NULL;
    return $block;
  }

  $shopify_products = entity_load('shopify_product', $ids);
  $products = array_map(function ($n) {
    return _shopify_enhancements_format_product($n);
  }, $shopify_products);

  $id = md5(drupal_random_bytes(8));
  $block = new stdClass();
  $block->title = NULL;
  $block->content = array(
    '#markup' => '<div id="' . $id. '"><div style="text-align:center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i></div></div>',
    '#attached' => array(
      'js' => array(
        array(
          'type' => 'setting',
          'data' => array(
            'shopify_enhancements' => array(
              'instances' => array(
                $id => array(
                  'categories' => _shopify_enhancements_categories_map($category_map),
                  'products' => array_values($products),
                ),
              ),
            ),
          ),
        ),
      ),
      'library' => array(
        array('shopify_enhancements', 'shopify_enhancements'),
      ),
    ),
  );
  $classes = array();

  return $block;
}

/**
 * Implements ctools content type admin info callback.
 */
function shopify_enhancements_admin_info($subtype, $conf, $contexts = NULL) {
  $variables = array(
    'rows' => array(),
  );

  $options = array();

  $variables['rows'][] = array(t('Display Style'), check_plain($conf['display_style']));
  $variables['rows'][] = array(t('Display Limit'), check_plain($conf['limit']));

  $block = new stdClass();
  $block->title = t('Trivia sorted by @sort', array('@sort' => $conf['sort_by']));
  $block->content = theme('table', $variables);

  return $block;
}

/**
 * Implements ctools content type edit form callback.
 */
function shopify_enhancements_edit_form($form, &$form_state) {
  $conf = $form_state['conf'];

  $form['source'] = array(
    '#type' => 'radios',
    '#title' => t('Source'),
    '#options' => array(
      'context' => t('Load from context (taxonomy)'),
      'custom' => t('Choose IDs'),
    ),
    '#default_value' => isset($conf['gallery_source']) ? $conf['gallery_source'] : 'context',
  );
  $products = shopify_product_load_multiple(FALSE, array('variant_id' => '0'));

  $options = array_map(function($n) {
    return $n->title;
  }, $products);

  $form['ids'] = array(
    '#type' => 'select',
    '#title' => t('Products'),
    '#description' => t('A list of products to load.'),
    '#options' => $options,
    '#multiple' => TRUE,
    '#default_value' => isset($conf['ids']) ? $conf['ids'] : array(),
  );

  return $form;
}

/**
 * Implements ctools content type edit form validate callback.
 */
function shopify_enhancements_edit_form_validate($form, &$form_state) {
  $values = $form_state['values'];
}

/**
 * Implements ctools content type edit form submit callback.
 */
function shopify_enhancements_edit_form_submit($form, &$form_state) {
  foreach (array('source', 'ids') as $key) {
    $form_state['conf'][$key] = $form_state['values'][$key];
  }
}

/**
 * Get reference field values and embed them for React to consume.
 *
 * @param ShopifyProduct $product
 *   The product to modify.
 *
 * @return ShopifyPorudct
 */
function _shopify_enhancements_format_product($product) {
  $wrapper = entity_metadata_wrapper('shopify_product', $product);
  $fields = field_info_instances('shopify_product', 'shopify_product');
  foreach ($fields as $key => $settings) {
    if (isset($settings['widget']['module']) && $settings['widget']['module'] == 'image') {
      $images = array();
      foreach ($wrapper->{$key}->value() as $index => $image) {
        $images[$index] = theme('image_style', array(
          'path'=> $image['uri'],
          'alt'=> $image['alt'],
          'title'=> $image['title'],
          'style_name' => 'large',
          )
        );
      }
      $product->{$key} = $images;
    }
    else {
      $product->{$key} = $wrapper->{$key}->value();
    }
  }
  if (!$product->variant_id && !empty($product->variants)) {
    $variant = array_pop($product->variants);
    $product->price = $variant->price;
    $product->compare_at_price = $variant->compare_at_price;
  }
  return $product;
}
