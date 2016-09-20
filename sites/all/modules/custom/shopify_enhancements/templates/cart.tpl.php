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
  <span class="tooltip"></span>
</a>
</span>
<div id="cartModal" class="reveal-modal cart-modal" data-css-top="0" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <div class="cart__wrapper">
    <div id="cart" class="cart"></div>
    <div class="cart__buttons">
      <button id="continue_shopping" class="cart__close js_cart_close">Continue Shopping</button>
      <button id="checkout" class="cart__checkout">Checkout</button>
    </div>
  </div>
  <a class="close-reveal-modal">close</a>
</div>
