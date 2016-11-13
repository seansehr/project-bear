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

<div class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <?php if ($url): ?>
        <a href="<?php print $url; ?>"><?php print $title; ?></a>
      <?php else: ?>
        <?php print $title; ?>
      <?php endif; ?>
    </h2>
  <?php endif; ?>

  <div class="content row"<?php print $content_attributes; ?>>
    <div class="small-12 medium-9 medium-push-3 columns">
      <div class="product__images">
        <?php print render($content['shopify_product_images']); ?>
      </div>
    </div>
    <div class="small-12 medium-3 medium-pull-9 columns product__sidebar">
      <div>
        <div class="product__product_type">
          <?php print $shopify_product->vendor; ?>
        </div>
        <?php if (isset($size)): ?>
          <div class="product__size">
            <?php print $size ?>
          </div>
        <?php endif; ?>
      </div>
      <h1 class="product__title">
        <?php print $title ?>
      </h1>
      <div class="product__vendor">

      </div>
      <ul class="product__tabs fa-ul">
        <li>
          <a role="button" href="#" class="description" data-tab="description"><i class="fa fa-file-text-o" aria-hidden="true"></i><span class="show-for-sr">Description</span></a>
        </li>
        <li>
          <a role="button" href="#" class="specs" data-tab="specs"><i class="fa fa-list-ul" aria-hidden="true"></i><span class="show-for-sr">Specs</span></a>
        </li>
        <li>
          <a role="button" href="#" class="dimensions" data-tab="dimensions"><i class="icon icon-ruler" aria-hidden="true"></i><span class="show-for-sr">Specs</span></a>
        </li>
        <li>
          <a role="button" href="#" class="shipping" data-tab="shipping"><i class="fa fa-truck fa-flip-horizontal" aria-hidden="true"></i><span class="show-for-sr">Shipping</span></a>
        </li>
        <li>
          <a role="button" href="#" class="return" data-tab="return"><i class="fa fa-refresh" aria-hidden="true"></i><span class="show-for-sr">Returns</span></a>
        </li>
      </ul>
      <div class="product__tab-content">
        <div class="description">
          <?php print render($content['body_html']); ?>
        </div>
        <div class="specs">
          <?php if (isset($specs)): ?>
            <?php print $specs; ?>
          <?php endif; ?>
        </div>
        <div class="dimensions">
          <?php if (isset($dimensions)): ?>
            <?php print $dimensions; ?>
          <?php endif; ?>
        </div>
        <div class="shipping">
          <?php if (isset($shipping)): ?>
            <?php print $shipping['value'] ?>
          <?php endif; ?>
        </div>
        <div class="return">
          <?php if (isset($returns)): ?>
            <?php print $returns['value'] ?>
          <?php endif; ?>
        </div>
      </div>
      <div>
        <div class="product__status">
          <?php print render($content['shopify_product_tags']); ?>
        </div>
        <div class="product__price">
          <span class="price__compare_at" data-price="<?php print $compare_at_price ;?>">
            <?php print $compare_at_price; ?>
          </span>
          <span class="shopify-price <?php if($compare_at_price) print 'price--compare'; ?>" data-price="<?php print $price ;?>">
            <?php print render($price); ?>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="content row product__bottom">
    <div class="small-12 medium-9 medium-push-3 columns">
      <div class="product__images">
        <div class="flex-control-nav-container"></div>
      </div>
    </div>
    <div class="small-12 medium-3 medium-pull-9 columns product__sidebar">
      <div class="product__add-to-cart">
        <?php print render($content['add_to_cart']); ?>
      </div>
      <div class="product__share">
        <div class="a2a_kit a2a_kit_size_24 a2a_default_style">
          <a class="a2a_button_facebook"></a>
          <a class="a2a_button_twitter"></a>
          <a class="a2a_button_google_plus"></a>
          <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
        </div>
        <script type="text/javascript">
          var a2a_config = a2a_config || {};
          a2a_config.color_main = "717171";
          a2a_config.color_border = "717171";
          a2a_config.color_link_text = "333333";
          a2a_config.color_link_text_hover = "FFFFFF";
          a2a_config.color_arrow_hover = "fff";
          // var a2a_config = a2a_config || {};
          a2a_config.icon_color = "transparent";
        </script>
        <script type="text/javascript" src="//static.addtoany.com/menu/page.js"></script>
      </div>
    </div>
  </div>
</div>

<?php print render($image_modal); ?>
