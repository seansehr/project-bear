<?php
/**
 * @file
 * marquee.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function marquee_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "flexslider" && $api == "flexslider_default_preset") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function marquee_node_info() {
  $items = array(
    'marquee' => array(
      'name' => t('Marquee'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'marquee_slide' => array(
      'name' => t('Marquee Slide'),
      'base' => 'node_content',
      'description' => t('A slide to be put in a marquee.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
