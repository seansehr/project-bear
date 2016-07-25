<?php
/**
 * @file
 * Default output for a FlexSlider object.
*/
?>
<div <?php print drupal_attributes($settings['attributes'])?>>
  <div class="controls--prev"></div>
  <div class="controls--next"></div>
  <?php print theme('flexslider_list', array('items' => $items, 'settings' => $settings)); ?>
</div>
