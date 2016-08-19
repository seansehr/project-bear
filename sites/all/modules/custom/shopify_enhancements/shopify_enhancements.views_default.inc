<?php
/**
 * @file
 * shopify_enhancements.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function shopify_enhancements_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'preorder_products';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'shopify_products';
  $view->human_name = 'Preorder Products';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Preorder Products';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  /* Relationship: Shopify Product: Shopify Product Tags (shopify_product_tags) */
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['id'] = 'shopify_product_tags_tid';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['table'] = 'field_data_shopify_product_tags';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['field'] = 'shopify_product_tags_tid';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['label'] = 'Shopify Product Tags';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['required'] = TRUE;
  /* Field: Shopify Product: Entity ID */
  $handler->display->display_options['fields']['id']['id'] = 'id';
  $handler->display->display_options['fields']['id']['table'] = 'shopify_products';
  $handler->display->display_options['fields']['id']['field'] = 'id';
  /* Sort criterion: Shopify Product: Published Date */
  $handler->display->display_options['sorts']['published_at']['id'] = 'published_at';
  $handler->display->display_options['sorts']['published_at']['table'] = 'shopify_products';
  $handler->display->display_options['sorts']['published_at']['field'] = 'published_at';
  $handler->display->display_options['sorts']['published_at']['order'] = 'DESC';
  /* Filter criterion: Taxonomy term: Name */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['relationship'] = 'shopify_product_tags_tid';
  $handler->display->display_options['filters']['name']['value'] = 'Preorder';
  /* Filter criterion: Shopify Product: Variant ID */
  $handler->display->display_options['filters']['variant_id']['id'] = 'variant_id';
  $handler->display->display_options['filters']['variant_id']['table'] = 'shopify_products';
  $handler->display->display_options['filters']['variant_id']['field'] = 'variant_id';
  $handler->display->display_options['filters']['variant_id']['value']['value'] = '0';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['preorder_products'] = $view;

  $view = new view();
  $view->name = 'recently_viewed_products';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'shopify_products';
  $view->human_name = 'Recently Viewed Products';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Recently Viewed Products';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  /* Relationship: Recently Read: Recently Read */
  $handler->display->display_options['relationships']['shopify_product_rr_id']['id'] = 'shopify_product_rr_id';
  $handler->display->display_options['relationships']['shopify_product_rr_id']['table'] = 'shopify_products';
  $handler->display->display_options['relationships']['shopify_product_rr_id']['field'] = 'shopify_product_rr_id';
  $handler->display->display_options['relationships']['shopify_product_rr_id']['required'] = TRUE;
  /* Field: Shopify Product: Entity ID */
  $handler->display->display_options['fields']['id']['id'] = 'id';
  $handler->display->display_options['fields']['id']['table'] = 'shopify_products';
  $handler->display->display_options['fields']['id']['field'] = 'id';
  /* Sort criterion: Recently Read: Recently Read Date */
  $handler->display->display_options['sorts']['timestamp']['id'] = 'timestamp';
  $handler->display->display_options['sorts']['timestamp']['table'] = 'recently_read';
  $handler->display->display_options['sorts']['timestamp']['field'] = 'timestamp';
  $handler->display->display_options['sorts']['timestamp']['relationship'] = 'shopify_product_rr_id';
  $handler->display->display_options['sorts']['timestamp']['order'] = 'DESC';
  /* Contextual filter: Shopify Product: Entity ID */
  $handler->display->display_options['arguments']['id']['id'] = 'id';
  $handler->display->display_options['arguments']['id']['table'] = 'shopify_products';
  $handler->display->display_options['arguments']['id']['field'] = 'id';
  $handler->display->display_options['arguments']['id']['default_action'] = 'default';
  $handler->display->display_options['arguments']['id']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['id']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['id']['not'] = TRUE;
  /* Filter criterion: Recently Read: Current */
  $handler->display->display_options['filters']['current']['id'] = 'current';
  $handler->display->display_options['filters']['current']['table'] = 'recently_read';
  $handler->display->display_options['filters']['current']['field'] = 'current';
  $handler->display->display_options['filters']['current']['relationship'] = 'shopify_product_rr_id';
  $handler->display->display_options['filters']['current']['value'] = '1';
  /* Filter criterion: Recently Read: entity type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'recently_read';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['relationship'] = 'shopify_product_rr_id';
  $handler->display->display_options['filters']['type']['value'] = array(
    'shopify_product' => 'shopify_product',
  );
  /* Filter criterion: Shopify Product: Variant ID */
  $handler->display->display_options['filters']['variant_id']['id'] = 'variant_id';
  $handler->display->display_options['filters']['variant_id']['table'] = 'shopify_products';
  $handler->display->display_options['filters']['variant_id']['field'] = 'variant_id';
  $handler->display->display_options['filters']['variant_id']['value']['value'] = '0';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['recently_viewed_products'] = $view;

  $view = new view();
  $view->name = 'related_products';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'shopify_products';
  $view->human_name = 'Related Products';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Related Products';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['group_by'] = TRUE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '8';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'Test';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
  /* Relationship: Shopify Product: Shopify Product Tags (shopify_product_tags) */
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['id'] = 'shopify_product_tags_tid';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['table'] = 'field_data_shopify_product_tags';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['field'] = 'shopify_product_tags_tid';
  $handler->display->display_options['relationships']['shopify_product_tags_tid']['required'] = TRUE;
  /* Relationship: Taxonomy term: Shopify Product using Shopify Product Tags */
  $handler->display->display_options['relationships']['reverse_shopify_product_tags_shopify_product']['id'] = 'reverse_shopify_product_tags_shopify_product';
  $handler->display->display_options['relationships']['reverse_shopify_product_tags_shopify_product']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_shopify_product_tags_shopify_product']['field'] = 'reverse_shopify_product_tags_shopify_product';
  $handler->display->display_options['relationships']['reverse_shopify_product_tags_shopify_product']['relationship'] = 'shopify_product_tags_tid';
  /* Relationship: Shopify Product: Shopify Brand Reference (field_shopify_brand_reference) */
  $handler->display->display_options['relationships']['field_shopify_brand_reference_tid']['id'] = 'field_shopify_brand_reference_tid';
  $handler->display->display_options['relationships']['field_shopify_brand_reference_tid']['table'] = 'field_data_field_shopify_brand_reference';
  $handler->display->display_options['relationships']['field_shopify_brand_reference_tid']['field'] = 'field_shopify_brand_reference_tid';
  $handler->display->display_options['relationships']['field_shopify_brand_reference_tid']['label'] = 'Shopify Brand';
  /* Relationship: Taxonomy term: Shopify Product using Shopify Brand Reference */
  $handler->display->display_options['relationships']['reverse_field_shopify_brand_reference_shopify_product']['id'] = 'reverse_field_shopify_brand_reference_shopify_product';
  $handler->display->display_options['relationships']['reverse_field_shopify_brand_reference_shopify_product']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['relationships']['reverse_field_shopify_brand_reference_shopify_product']['field'] = 'reverse_field_shopify_brand_reference_shopify_product';
  $handler->display->display_options['relationships']['reverse_field_shopify_brand_reference_shopify_product']['relationship'] = 'field_shopify_brand_reference_tid';
  $handler->display->display_options['relationships']['reverse_field_shopify_brand_reference_shopify_product']['required'] = TRUE;
  /* Field: Broken/missing handler */
  $handler->display->display_options['fields']['title_1']['id'] = 'title_1';
  $handler->display->display_options['fields']['title_1']['table'] = 'shopify_products';
  $handler->display->display_options['fields']['title_1']['field'] = 'title';
  $handler->display->display_options['fields']['title_1']['label'] = '';
  $handler->display->display_options['fields']['title_1']['element_label_colon'] = FALSE;
  /* Field: Shopify Product: Entity ID */
  $handler->display->display_options['fields']['id']['id'] = 'id';
  $handler->display->display_options['fields']['id']['table'] = 'shopify_products';
  $handler->display->display_options['fields']['id']['field'] = 'id';
  $handler->display->display_options['fields']['id']['relationship'] = 'reverse_shopify_product_tags_shopify_product';
  /* Sort criterion: COUNT(Shopify Product: Entity ID) */
  $handler->display->display_options['sorts']['id']['id'] = 'id';
  $handler->display->display_options['sorts']['id']['table'] = 'shopify_products';
  $handler->display->display_options['sorts']['id']['field'] = 'id';
  $handler->display->display_options['sorts']['id']['group_type'] = 'count';
  $handler->display->display_options['sorts']['id']['order'] = 'DESC';
  /* Contextual filter: Shopify Product: Entity ID */
  $handler->display->display_options['arguments']['id']['id'] = 'id';
  $handler->display->display_options['arguments']['id']['table'] = 'shopify_products';
  $handler->display->display_options['arguments']['id']['field'] = 'id';
  $handler->display->display_options['arguments']['id']['relationship'] = 'reverse_shopify_product_tags_shopify_product';
  $handler->display->display_options['arguments']['id']['default_action'] = 'default';
  $handler->display->display_options['arguments']['id']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['id']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Shopify Product: Entity ID */
  $handler->display->display_options['arguments']['id_2']['id'] = 'id_2';
  $handler->display->display_options['arguments']['id_2']['table'] = 'shopify_products';
  $handler->display->display_options['arguments']['id_2']['field'] = 'id';
  $handler->display->display_options['arguments']['id_2']['relationship'] = 'reverse_field_shopify_brand_reference_shopify_product';
  $handler->display->display_options['arguments']['id_2']['default_action'] = 'default';
  $handler->display->display_options['arguments']['id_2']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['id_2']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['id_2']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['id_2']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Shopify Product: Entity ID */
  $handler->display->display_options['arguments']['id_1']['id'] = 'id_1';
  $handler->display->display_options['arguments']['id_1']['table'] = 'shopify_products';
  $handler->display->display_options['arguments']['id_1']['field'] = 'id';
  $handler->display->display_options['arguments']['id_1']['default_action'] = 'default';
  $handler->display->display_options['arguments']['id_1']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['id_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['id_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['id_1']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['id_1']['not'] = TRUE;
  /* Filter criterion: Shopify Product: Variant ID */
  $handler->display->display_options['filters']['variant_id']['id'] = 'variant_id';
  $handler->display->display_options['filters']['variant_id']['table'] = 'shopify_products';
  $handler->display->display_options['filters']['variant_id']['field'] = 'variant_id';
  $handler->display->display_options['filters']['variant_id']['value']['value'] = '0';
  /* Filter criterion: COUNT(Taxonomy term: Name) */
  $handler->display->display_options['filters']['name']['id'] = 'name';
  $handler->display->display_options['filters']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['filters']['name']['field'] = 'name';
  $handler->display->display_options['filters']['name']['relationship'] = 'shopify_product_tags_tid';
  $handler->display->display_options['filters']['name']['group_type'] = 'count';
  $handler->display->display_options['filters']['name']['operator'] = '>=';
  $handler->display->display_options['filters']['name']['value']['value'] = '1';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['related_products'] = $view;

  return $export;
}
