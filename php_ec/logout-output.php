<?php session_start(); ?>
<?php require 'menu.php'; ?>
<?php
if (isset($_SESSION['customer'])) {
	unset($_SESSION['customer']);
	echo '<font color="#fff">ログアウトしました。</font>';
} else {
	echo '<font color="#fff">すでにログアウトしています。</font>';
}
?>
