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
<div class="cart-button js_cart_toggle" id="cart-button">
  <?php print $cart ?><span class="cart-count" id="cart-count"></span>
</div>
</span>
<div class="cart-wrapper row">
  <div id="cart_close" class="cart-close js_cart_close"><div class="show-for-sr">close</div><i class="fa fa-close"></i></div>
  <div class="small-12 small-offset-2">
    <div id="cart" class="cart"></div>
    <div class="cart__buttons">
      <button id="continue_shopping" class="cart__close js_cart_close">Continue Shopping</button>
      <button id="checkout" class="cart__checkout">Checkout</button>
    </div>
  </div>
</div>
