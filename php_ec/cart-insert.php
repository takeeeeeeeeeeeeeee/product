<?php session_start(); ?>
<?php require 'menu.php' ;?>
<?php
$id=$_REQUEST['id'];
if (!isset($_SESSION['product'])) {
	$_SESSION['product']=[];
}
$count=0;
if (isset($_SESSION['product'][$id])) {
	$count=$_SESSION['product'][$id]['count'];
}
$_SESSION['product'][$id]=[
	'name'=>$_REQUEST['name'], 
	'price'=>$_REQUEST['price'], 
	'count'=>$count+$_REQUEST['count']
];

require 'cart.php';
echo '<br>';
echo '<font color="#fff">カートに商品を追加しました。</font>';
?>
