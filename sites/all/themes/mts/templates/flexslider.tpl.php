<?php
/**
 * @file
 * Default output for a FlexSlider object.
*/
?>
<div <?php print drupal_attributes($settings['attributes'])?>>
  <div class="controls">
    <div class="controls__prev"></div>
    <div class="controls__expand"></div>
    <div class="controls__next"></div>
  </div>
  <?php print theme('flexslider_list', array('items' => $items, 'settings' => $settings)); ?>
</div>
