<?php
/**
 * @file
 * Template for a shopify metafield entity.
 *
 * Variables available:
 * - $shopify_metafield: an array of the entity properties.
 */
?>
<div class="key"><?php print $shopify_metafield['metafield_key']; ?></div>
<div class="value"><?php print $shopify_metafield['value']; ?></div>
