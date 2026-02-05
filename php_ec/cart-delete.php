<?php session_start(); ?>
<?php require 'haikeinomi.php'; ?>
<?php
unset($_SESSION['product'][$_REQUEST['id']]);

require 'cart.php';
echo '<font color="#fff">カートから商品を削除しました。</font>';
?>
