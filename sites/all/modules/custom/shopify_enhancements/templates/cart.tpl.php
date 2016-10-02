<?php

/**
 * @file
 * Template for Shopify Cart, uses Angular.
 *
 * Variables available:
 * - $cart: The translated string "Cart".
 * - $title: The title.
 * - $color: The color of the title.
 */
?>
<a href="#" data-reveal-id="cartModal" class="cart-button">
  <i class="icon icon-cart" aria-hidden="true"></i>
  <span class="show-for-sr"><?php print $cart ?></span>
  <span class="cart-count" id="cart-count"></span>
</a>
<div class="js-cart-add cart-add">
  <div class="cart-add__inner">
    <div id="cart-add"></div>
    <div class="cart-add__message"><?php print t('The following item was added to your cart.'); ?></div>
  </div>
</div>
<div id="cartModal" class="reveal-modal cart-modal" data-css-top="0" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <div class="cart__wrapper">
    <div id="cart" class="cart"></div>
    <div class="cart__buttons">
      <button id="continue_shopping" class="cart__close js_cart_close"><?php print t('Continue Shopping'); ?></button>
      <button id="checkout" class="cart__checkout"><?php print t('Checkout'); ?></button>
    </div>
  </div>
  <a class="close-reveal-modal"><?php print t('Close'); ?></a>
</div>
