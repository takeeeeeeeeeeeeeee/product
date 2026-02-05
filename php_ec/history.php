<?php session_start(); ?>
<?php require 'menu.php'; ?>
<?php
if (isset($_SESSION['customer'])) {
	$pdo=new PDO('mysql:host=localhost;dbname=shop;charset=utf8', 
		'staff', 'password');
	$sql_purchase=$pdo->prepare(
		'select * from purchase where customer_id=? order by id desc');
	$sql_purchase->execute([$_SESSION['customer']['id']]);
	foreach ($sql_purchase as $row_purchase) {
		$sql_detail=$pdo->prepare(
			'select * from purchase_detail,product '.
			'where purchase_id=? and product_id=id');
		$sql_detail->execute([$row_purchase['id']]);
		echo '<table>';
		echo '<tr><th><font color="#fff">商品番号</font></th><th><font color="#fff">商品名</font></th>', 
			'<th><font color="#fff">価格</font></th><th><font color="#fff">個数</font></th><th><font color="#fff">小計</font></th></tr>';
		$total=0;
		foreach ($sql_detail as $row_detail) {
			echo '<tr>';
			echo '<td><font color="#fff">', $row_detail['id'], '</fon></td>';
			echo '<td><a href="detail.php?id=', $row_detail['id'], '">', 
				$row_detail['name'], '</a></td>';
			echo '<td><font color="#fff">', $row_detail['price'], '</font></td>';
			echo '<td><font color="#fff">', $row_detail['count'], '</font></td>';
			$subtotal=$row_detail['price']*$row_detail['count'];
			$total+=$subtotal;
			echo '<td><font color="#fff">', $subtotal, '</font></td>';
			echo '</tr>';
		}
		echo '<tr><td><font color="#fff">合計</font></td><td></td><td></td><td></td><td><font color="#fff">', 
			$total, '</font></td></tr>';
		echo '</table>';
		echo '<hr>';
	}
} else {
	echo '<font color="#fff">購入履歴を表示するには、ログインしてください。</font>';
}
?>
