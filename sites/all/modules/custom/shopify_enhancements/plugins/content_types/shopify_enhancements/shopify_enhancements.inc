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
  // 'category' => array(WIDGETS_CATEGORY, WIDGETS_CATEGORY_WEIGHT),
  'admin info' => 'shopify_enhancements_admin_info',
  'no title override' => TRUE,
  // 'available sizes' => array(WIDGET_SIZE_SMALL, WIDGET_SIZE_MEDIUM, WIDGET_SIZE_LARGE),
  'all contexts' => TRUE,
);

/**
 * Implements ctools content type render callback.
 */
function shopify_enhancements_render($subtype, $conf, $args, $contexts) {
  if (!empty($args) && $tax = taxonomy_term_load($args[0])) {
    // dpm($tax);
    switch ($tax->vocabulary_machine_name) {
      case 'shopify_brands':
        $field_name = 'field_shopify_brand_reference';
        break;

      default:
        # code...
        break;
    }
    $url = "/shopify_product.json?variant_id=0&$field_name=$tax->tid";
  }
  $id = md5(drupal_random_bytes(8));
  $block = new stdClass();
  $block->title = NULL;
  $block->content = array(
    '#markup' => '<div id="' . $id. '"></div>',
    '#attached' => array(
      'js' => array(
        array(
          'type' => 'setting',
          'data' => array(
            'shopify_enhancements' => array(
              'instances' => array(
                $id => $url,
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

}
