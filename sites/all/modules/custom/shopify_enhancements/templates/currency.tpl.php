<?php

/**
 * @file
 * Template for Shopify Cart, uses Angular.
 *
 * Variables available:
 * - $currencies: List of different currency options.
 */
?>

<div class="currency">
  <div class="currency__active"><span class="currency__symbol">$</span>Currency: <span class="currency__name">USD</span></div>
  <div class="currency__selection">
    <?php foreach ($currencies as $code => $icon): ?>
      <a href="#" data-code="<?php print $code ?>"><?php print $icon ?></a>
    <?php endforeach; ?>
  </div>
</div>
