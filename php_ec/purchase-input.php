<?php session_start(); ?>
<?php require 'menu.php';?>
<?php
if (!isset($_SESSION['customer'])) {
	echo '<font color="#fff">購入手続きを行うにはログインしてください。</font>';
} else 
if (empty($_SESSION['product'])) {
	echo '<font color="#fff">カートに商品がありません。</font>';
} else {

	require 'cart.php';
	echo '<hr>';
	echo '<font color="#fff">内容をご確認いただき、購入を確定してください。</font><br>';
	echo '<font color="#fff">お名前：', $_SESSION['customer']['name'], '</font><br>';
	echo '<font color="#fff">ご住所：', $_SESSION['customer']['address'], '</font><br>';
	echo '<font color="#fff"><a href="purchase-output.php">購入を確定する</a></font>';
}
?>
