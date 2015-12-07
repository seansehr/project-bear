<?php
/**
 * @file
 * project_bear.panelizer.inc
 */

/**
 * Implements hook_panelizer_defaults().
 */
function project_bear_panelizer_defaults() {
  $export = array();

  $panelizer = new stdClass();
  $panelizer->disabled = FALSE; /* Edit this to true to make a default panelizer disabled initially */
  $panelizer->api_version = 1;
  $panelizer->name = 'node:page:default';
  $panelizer->title = 'Default';
  $panelizer->panelizer_type = 'node';
  $panelizer->panelizer_key = 'page';
  $panelizer->no_blocks = FALSE;
  $panelizer->css_id = '';
  $panelizer->css = '';
  $panelizer->pipeline = 'standard';
  $panelizer->contexts = array();
  $panelizer->relationships = array();
  $panelizer->access = array();
  $panelizer->view_mode = 'page_manager';
  $panelizer->css_class = '';
  $panelizer->title_element = 'H2';
  $panelizer->link_to_entity = TRUE;
  $panelizer->extra = array();
  $display = new panels_display();
  $display->layout = 'flexible';
  $display->layout_settings = array();
  $display->panel_settings = array();
  $display->cache = array();
  $display->title = '%node:title';
  $display->uuid = '3c01c4a8-8119-4f44-8183-6576048c03d7';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-11a2fda2-ecac-4c4f-8b39-4f29dec93183';
    $pane->panel = 'center';
    $pane->type = 'entity_field';
    $pane->subtype = 'node:body';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'label' => 'hidden',
      'formatter' => 'text_default',
      'delta_limit' => 0,
      'delta_offset' => '0',
      'delta_reversed' => FALSE,
      'formatter_settings' => array(),
      'context' => 'panelizer',
    );
    $pane->cache = array();
    $pane->style = array();
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '11a2fda2-ecac-4c4f-8b39-4f29dec93183';
    $display->content['new-11a2fda2-ecac-4c4f-8b39-4f29dec93183'] = $pane;
    $display->panels['center'][0] = 'new-11a2fda2-ecac-4c4f-8b39-4f29dec93183';
    $pane = new stdClass();
    $pane->pid = 'new-53c83ac4-c896-4041-8863-9f2a0c4012a3';
    $pane->panel = 'center';
    $pane->type = 'node_links';
    $pane->subtype = 'node_links';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => FALSE,
      'override_title_text' => '',
      'build_mode' => 'page_manager',
      'identifier' => '',
      'link' => TRUE,
      'context' => 'panelizer',
    );
    $pane->cache = array();
    $pane->style = array();
    $pane->css = array(
      'css_class' => 'link-wrapper',
    );
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '53c83ac4-c896-4041-8863-9f2a0c4012a3';
    $display->content['new-53c83ac4-c896-4041-8863-9f2a0c4012a3'] = $pane;
    $display->panels['center'][1] = 'new-53c83ac4-c896-4041-8863-9f2a0c4012a3';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-53c83ac4-c896-4041-8863-9f2a0c4012a3';
  $panelizer->display = $display;
  $export['node:page:default'] = $panelizer;

  return $export;
}
