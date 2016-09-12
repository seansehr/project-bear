<?php

/**
 * Implements template_preprocess_html().
 */
// function STARTER_preprocess_html(&$variables) {
// }

// /**
//  * Implements template_preprocess_page.
//  */
// function mts_preprocess_page(&$variables) {
//   // dpm($variables);
// }

// /**
//  * Implements template_preprocess_node.
//  */
// function STARTER_preprocess_node(&$variables) {
// }

/**
 * Implements theme_links() targeting the main menu topbar.
 */
function mts_links__topbar_main_menu($variables) {
  // We need to fetch the links ourselves because we need the entire tree.
  $links = menu_tree_output(menu_tree_all_data(variable_get('menu_main_links_source', 'main-menu')));
  $output = _zurb_foundation_links($links);

  return '<ul' . drupal_attributes($variables['attributes']) . '>' . $output . '</ul>';
}

function mts_preprocess_entity(&$variables) {
  if ($variables['elements']['#entity_type'] == 'shopify_product' && isset($variables['elements']['#entity'])) {
    $entity = $variables['shopify_product'];
    $variables['image_modal'] = FALSE;
    if (!empty($variables['shopify_product_images'])) {
      $variables['image_modal'] = array(
        '#theme' => 'image_modal',
        '#files' => $variables['shopify_product_images'],
      );
    }
    $fields = array('size', 'specs');
    foreach ($fields as $field) {
      if (!empty($entity->shopify_product_metafields)) {
        foreach ($entity->shopify_product_metafields[LANGUAGE_NONE] as $value) {
          $metafield = $value['entity'];
          if ($metafield->key == $field && ($metafield->namespace == 'attr' || $metafield->namespace == 'c_f')) {
            $variables[$field] = $metafield->value;
          }
        }
      }
    }
    if (!$entity->variant_id) {
      $primary_variant = array_values($entity->variants)[0];
    }
    else {
      $primary_variant = $entity;
    }
    $variables['price'] = $primary_variant->price;
    $variables['compare_at_price'] = $primary_variant->compare_at_price;
    $variables['primary_variant'] = $primary_variant->variant_id;
    $variables['shipping'] = variable_get('shopify_enhancements_shipping', NULL);
    $variables['returns'] = variable_get('shopify_enhancements_returns', NULL);
  }
}

function mts_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'shopify_add_to_cart_form') {
    unset($form['product']['variant']['quantity']);
  }
}
