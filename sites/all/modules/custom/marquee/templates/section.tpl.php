<?php

/**
 * @file
 * Template for marquee section.
 *
 * Variables available:
 * - $image: The image.
 * - $title: The title.
 * - $color: The color of the title.
 */
?>
<div class="slide__section">
  <div class="section__title" style="color: #<?php print $color ?>;"><?php print $title ?></div>
  <div class="section__image"><?php print render($image) ?></div>
</div>
