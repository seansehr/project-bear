<?php
/**
 * @file
 * Default output for a FlexSlider object.
*/
?>
<div <?php print drupal_attributes($settings['attributes'])?>>
  <div class="product__controls">
    <div class="controls--prev"></div>
    <div class="js-open-modal controls--open"></div>
    <div class="controls--next"></div>
  </div>
  <?php print theme('flexslider_list', array('items' => $items, 'settings' => $settings)); ?>
</div>
