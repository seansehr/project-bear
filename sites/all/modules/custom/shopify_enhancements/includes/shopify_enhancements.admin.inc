<?php
/**
 * @file
 * Contains functions and forms for admin pages.
 */

/**
 * Shopify Enhancements admin page.
 */
function shopify_enhancements_admin_form($form, &$form_state) {

  $shipping_value = variable_get('shopify_enhancements_shipping', array('value' => NULL));
  $form['shopify_enhancements_shipping'] = array(
    '#type' => 'text_format',
    '#format' => NULL,
    '#title' => t('Shipping Info'),
    '#description' => t('Shipping info displayed to users in shipping tab of products.'),
    '#default_value' => $shipping_value['value'],
  );

  $returns_value = variable_get('shopify_enhancements_returns', array('value' => NULL));
  $form['shopify_enhancements_returns'] = array(
    '#type' => 'text_format',
    '#format' => NULL,
    '#title' => t('Returns Info'),
    '#description' => t('Returns info displayed to users in shipping tab of products.'),
    '#default_value' => $returns_value['value'],
  );

  return system_settings_form($form);
}
