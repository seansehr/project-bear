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
  <div class="js-currency currency__label">
    <div class="currency__current"><span class="currency__symbol">$</span>:<span class="currency__name">USD</span></div>
    <div class="currency__active-label"><?php print t('Currency'); ?></div>
  </div>
  <div class="currency__selection">
    <?php foreach ($currencies as $code => $icon): ?>
      <a href="#" data-code="<?php print $code ?>"><?php print $icon ?></a>
    <?php endforeach; ?>
  </div>
</div>
