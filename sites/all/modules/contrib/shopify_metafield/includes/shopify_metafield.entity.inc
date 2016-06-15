<?php
/**
 * @file
 * Contains entity classes for Shopify products.
 */

/**
 * Class ShopifyMetafield
 */
class ShopifyMetafield extends Entity {

  /**
   * The unique numeric identifier for the metafield.
   * Metafield ids are unique across the entire Shopify system;
   * @var int
   */
  public $metafield_id;

  /**
   * The namespace of the metafield.
   * @var string
   */
  public $namespace;

  /**
   * The key of the metafield.
   * @var string
   */
  public $key;

  /**
   * The value of the metafield.
   * TODO: Manage this field better, perhaps use bundles? See value_type.
   * @var string
   */
  public $value;

  /**
   * The value type of the metafield, string or int.
   * @var string
   */
  public $value_type;

  /**
   * The shopify resource the metafield is attached to. We only care if it's
   * attached to a product, variant, or collection.
   * @var string
   */
  public $owner_resource;

  /**
   * The date and time when the metafield was created.
   * @var int
   */
  public $created_at;

  /**
   * The date and time when the metafield was last modified.
   * @var int
   */
  public $updated_at;

  /**
   * Creates a new ShopifyMetafield entity.
   */
  public function __construct(array $values = array()) {
    // Make sure the shopify metafield id is saved.
    if (!empty($values)) {
      if (isset($values['id']) && (!isset($values['metafield_id']) || !$values['metafield_id'])) {
        $values['metafield_id'] = $values['id'];
      }
      unset($values['id']);
    }

    parent::__construct($values, 'shopify_metafield');
  }

  /**
   * Formats all date times into Unix timestamps.
   */
  private function formatTimestamps() {
    foreach (array('updated_at', 'created_at') as $field) {
      $this->{$field} = $this->formatTimestamp($this->{$field});
    }
  }

  /**
   * Format a date time as Unix timestamp.
   *
   * @param string $datetime
   *   Datetime string.
   *
   * @return int
   *   Unix timestamp.
   */
  private function formatTimestamp($datetime) {
    if (empty($datetime)) {
      return 0;
    }
    if (!is_numeric($datetime)) {
      $date = new DateTime($datetime);
      return $date->format('U');
    }
    // Already a timestamp.
    return $datetime;
  }

  /**
   * Saves the entity.
   */
  public function save() {
    $this->formatTimestamps();
    return parent::save();
  }

}

/**
 * Class ShopifyProductController
 */
class ShopifyMetafieldController extends EntityAPIController {

  /**
   * Implements EntityAPIController.
   */
  public function buildContent($entity, $view_mode = 'full', $langcode = NULL, $content = array()) {
    $properties = entity_get_property_info('shopify_metafield');
    $variables = array();
    foreach ($properties['properties'] as $key => $value) {
      $variables[$key] = $entity->$key;
    }
    if ($variables['namespace'] == 'images') {
      $variables['value'] = theme('image', array(
        'path' => $variables['value'],
      ));
    }
    $content = array(
      '#theme' => 'shopify_metafield',
      '#shopify_metafield' => $variables,
    );
    return parent::buildContent($entity, $view_mode, $langcode, $content);
  }

}
