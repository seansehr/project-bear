<?php

/**
 * @file
 * Template for Shopify Cart, uses Angular.
 *
 * Variables available:
 * - $images: List of images in original format.
 * - $thumbnails: List of images in thumbnail size.
 */
?>

<div class="image-modal">
  <div class="image-modal__thumbnails">
    <?php foreach ($thumbnails as $thumbnail): ?>
      <?php print render($thumbnail); ?>
    <?php endforeach; ?>
  </div>
  <div class="image-modal__images">
    <div class="product__controls">
      <div class="js-close-modal controls--close"></div>
    </div>
    <?php foreach ($images as $image): ?>
      <?php print render($image); ?>
    <?php endforeach; ?>
  </div>
</div>
