<?php

/**
 * @file
 * Template for other products.
 *
 * Variables available:
 * - $related: Related products.
 * - $recent: Recently viewed products.
 * - $preorder: Preorder products available.
 */
?>
<div class="other-products">
  <ul class="tabs other-products__tabs" data-tab>
    <li class="other-products__tab tab-title active"><a href="#related" class="tab-link"><?php print t('Related Products') ?></a></li>
    <li class="other-products__tab tab-title"><a href="#preorder" class="tab-link"><?php print t('Preorder') ?></a></li>
    <li class="other-products__tab tab-title"><a href="#recent" class="tab-link"><?php print t('Recently Views') ?></a></li>
  </ul>
  <div class="tabs-content">
    <div class="content active" id="related"><?php print $related; ?></div>
    <div class="content" id="preorder"><?php print $preorder; ?></div>
    <div class="content" id="recent"><?php print $recent; ?></div>
  </div>
</div>
