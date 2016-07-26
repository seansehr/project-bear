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
    $variables['price'] = $variables['elements']['add_to_cart']['product']['variant']['price'];
    $fields = array('size', 'specs');
    foreach ($fields as $field) {
      if (!empty($variables['elements']['#entity']->shopify_product_metafields)) {
        foreach ($variables['elements']['#entity']->shopify_product_metafields[LANGUAGE_NONE] as $value) {
          $metafield = $value['entity'];
          if ($metafield->key == $field && ($metafield->namespace == 'attr' || $metafield->namespace == 'c_f')) {
            $variables[$field] = $metafield->value;
          }
        }
      }
    }
  }
}

function mts_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'shopify_add_to_cart_form') {
    unset($form['product']['variant']['quantity']);
  }
}

/**
 * Overriding flexslider_list theme implementation to output colorbox enabled images
 */
function mts_flexslider_list(&$vars) {
  // Reference configuration variables
  $optionset = &$vars['settings']['optionset'];
  if ($optionset->name == 'product') {
    $items = &$vars['items'];
    $attributes = &$vars['settings']['attributes'];
    $type = &$vars['settings']['type'];
    $output = '';
    $group = $optionset->title;

    // Build the list
    if (!empty($items)) {
      $output .= "<$type" . drupal_attributes($attributes) . '>';
      foreach ($items as $i => $item) {

        $caption = '';
        if (!empty($item['caption'])) {
          $caption = $item['caption'];
        }

        // Build path to colorbox image style. Replace 'colorbox' with your image style name.
        $colorbox_path = file_create_url($item['item']['uri']);
        $image_options = array(
          'style_name' => 'original',
          'path'       => $item['item']['uri'],
          'height'     => $item['item']['height'],
          'width'      => $item['item']['width'],
          'alt'        => $item['item']['alt'],
          'title'      => $item['item']['title'],
        );

        $item['slide'] = theme('colorbox_imagefield', array('image' => $image_options, 'path' => $colorbox_path, 'title' => $caption, 'gid' => array('rel' => $group)));

        $output .= theme('flexslider_list_item', array(
          'item' => $item['slide'],
          'settings' => array(
            'optionset' => $optionset,
          ),
          'caption' => $caption,
        ));
      }
      $output .= "</$type>";
    }

  }
  else {
    // Reference configuration variables
    $optionset = &$vars['settings']['optionset'];
    $items = &$vars['items'];
    $attributes = &$vars['settings']['attributes'];
    $type = &$vars['settings']['type'];
    $output = '';

    // Build the list
    if (!empty($items)) {
      $output .= "<$type" . drupal_attributes($attributes) . '>';
      foreach ($items as $i => $item) {

        $caption = '';
        if (!empty($item['caption'])) {
          $caption = $item['caption'];
        }

        $output .= theme('flexslider_list_item', array(
          'item' => $item['slide'],
          'settings' => array(
            'optionset' => $optionset,
          ),
          'caption' => $caption,
        ));
      }
      $output .= "</$type>";
    }
  }

  return $output;
}
