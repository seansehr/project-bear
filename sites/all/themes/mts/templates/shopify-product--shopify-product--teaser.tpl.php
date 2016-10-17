<?php

/**
 * @file
 * Default theme implementation for entities.
 *
 * Available variables:
 * - $content: An array of comment items. Use render($content) to print them all, or
 *   print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $title: The (sanitized) entity label.
 * - $url: Direct url of the current entity if specified.
 * - $page: Flag for the full page state.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity-{ENTITY_TYPE}
 *   - {ENTITY_TYPE}-{BUNDLE}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
?>

<div class="product_thumb <?php print $classes; ?>">
  <div class="product_thumb__inner">
    <div class="product_thumb__image">
      <a href="<?php print $url; ?>">
        <?php if(isset($content['shopify_product_images'][0])): ?>
          <?php print render($content['shopify_product_images'][0]); ?>
        <?php endif; ?>
      </a>
      <div class="product_thumb__image--hover">
        <a href="<?php print $url; ?>">
          <?php if(isset($content['shopify_product_images'][1])): ?>
            <?php print render($content['shopify_product_images'][1]); ?>
          <?php endif; ?>
        </a>
      </div>
    </div>
    <div class="product_thumb__info top">
      <div class="product_thumb__vendor">
        <?php if(isset($shopify_product->vendor)): ?>
          <?php print $shopify_product->vendor; ?>
        <?php endif; ?>
      </div>
      <div class="product_thumb__size">
        <?php if(isset($size)): ?>
          <?php print $size ?>
        <?php endif; ?>
      </div>
    </div>
    <div class="product_thumb__info bottom">
      <div class="product_thumb__status">
        <?php if(isset($content['shopify_product_tags'])): ?>
          <?php print render($content['shopify_product_tags']); ?>
        <?php endif; ?>
      </div>
      <div class="product_thumb__price">
        <span class="price__compare_at" data-price="<?php print $compare_at_price ;?>">
          <?php print $compare_at_price; ?>
        </span>
        <span class="shopify-price <?php if($compare_at_price) print 'price--compare'; ?>" data-price="<?php print $price ;?>">
          <?php print render($price); ?>
        </span>
      </div>
    </div>
    <div class="product_thumb__info on-hover">
      <a href="<?php print $url; ?>" class="product_thumb__name">
        <?php print $title ?>
      </a>
      <div class="product_thumb__actions">
        <a role="button" href="#" class="js-preview-atc specs" data-variant-id="<?php print $primary_variant; ?>" data-product-id="<?php print $elements['#entity']->product_id; ?>">
          <i class="icon icon-cart-add" aria-hidden="true"></i>
          <span class="show-for-sr">Add <?php print $title ?> to Cart</span>
        </a>
      </div>
    </div>
  </div>
</div>
