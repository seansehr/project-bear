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
  $output = _mts_links($links);

  return '<ul' . drupal_attributes($variables['attributes']) . '>' . $output . '</ul>';
}

/**
 * Helper function to output a Drupal menu as a Foundation Top Bar.
 *
 * @links array
 *   An array of menu links.
 *
 * @return string
 *   A rendered list of links, with no <ul> or <ol> wrapper.
 *
 * @see zurb_foundation_links__system_main_menu()
 * @see zurb_foundation_links__system_secondary_menu()
 */
function _mts_links($links) {
  $output = '';

  foreach (element_children($links) as $key) {
    $output .= _mts_render_link($links[$key]);
  }

  return $output;
}

/**
 * Helper function to recursively render sub-menus.
 *
 * @link array
 *   An array of menu links.
 *
 * @return string
 *   A rendered list of links, with no <ul> or <ol> wrapper.
 *
 * @see _mts_links()
 */
function _mts_render_link($link) {
  $output = '';

  if ($link['#original_link']['module'] == 'taxonomy_menu') {
    $term = menu_get_object('taxonomy_term', 2, $link['#original_link']['link_path']);
    $fields = array(
      'shopify_categories' => 'field_shopify_category_reference',
      'shopify_brands' => 'field_shopify_brand_reference',
      'shopify_licences' => 'field_shopify_licence_reference',
      'shopify_scales' => 'field_shopify_scale_reference',
    );
    if ($field = $fields[$term->vocabulary_machine_name]) {
      $query = new EntityFieldQuery();
      $query->entityCondition('entity_type', 'shopify_product')
        // get only nodes that are 'published'
        ->propertyCondition('variant_id', 0)
        // replace field_food_menu with field_TAXONOMY_NAME
        // replace 2 with the taxonomy ID (tid) you're wanting
        ->fieldCondition($field, 'tid', $term->tid)
        ->propertyOrderBy('updated_at', 'DESC')
        ->range(0, 2);
      $result = $query->execute();
      // dpm($result, '$result');
      if (!empty($result['shopify_product'])) {
        $ids = array_keys($result['shopify_product']);
        $settings = array(
          'mts' => array(
            'ids' => $ids,
          ),
        );
        drupal_add_js($settings, 'setting');
        $link['#attributes']['data-products'] = implode($ids, ',');
        $link['#attributes']['class'][] = 'product-dropdown';
      }
    }
  }

  // This is a duplicate link that won't get the dropdown class and will only
  // show up in small-screen.
  $small_link = $link;

  if (!empty($link['#below'])) {
    $link['#attributes']['class'][] = 'has-dropdown';

    if ($link['#original_link']['plid'] == 0) {
      foreach ($link['#below'] as $child) {
        if (!empty($child['#below'])) {
          $link['#attributes']['class'][] = 'has-grandchild';
        }
      }
    }
  }

  // Render top level and make sure we have an actual link.
  if (!empty($link['#href'])) {
    $rendered_link = NULL;

    if (!isset($rendered_link)) {
      $rendered_link = theme('zurb_foundation_menu_link', array('link' => $link));
    }

    // Test for localization options and apply them if they exist.
    if (isset($link['#localized_options']['attributes']) && is_array($link['#localized_options']['attributes'])) {
      $link['#attributes'] = array_merge_recursive($link['#attributes'], $link['#localized_options']['attributes']);
    }
    $output .= '<li' . drupal_attributes($link['#attributes']) . '>' . $rendered_link;

    if (!empty($link['#below'])) {
      $output .= '<div class="dropdown">';
      $sub_menu = '';
      // Build sub nav recursively.
      foreach ($link['#below'] as $sub_link) {
        if (!empty($sub_link['#href'])) {
          $sub_menu .= _mts_render_link($sub_link);
        }
      }

      $output .= '<ul class="dropdown-inner clearfix">' . $sub_menu . '</ul>';

      if ($link['#original_link']['plid'] == 0) {
        $container = '<div class="product-container"></div>';
        $output .= "<div class='js-dropdown-products'>$container $container</div>";
      }
      $output .= '</div>';
    }
    else {

    }

    $output .= '</li>';
  }

  return $output;
}

/**
 * Implements hook_preprocess_THEME.
 */
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
    $fields = array('size', 'specs', 'dimensions');
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

/**
 * Implements hook_form_alter.
 */
function mts_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'shopify_add_to_cart_form') {
    unset($form['product']['variant']['quantity']);
  }
}

/**
 * Implements hook_preprocess_THEME.
 *
 * Add a theme hook suggestion for flexslider.
 */
function mts_preprocess_flexslider(&$variables) {
  $variables['theme_hook_suggestions'][] = 'flexslider__' . $variables['settings']['optionset'];
}
