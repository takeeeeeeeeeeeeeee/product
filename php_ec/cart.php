<?php require 'haikeinomi.php' ;?>
<?php
if (!empty($_SESSION['product'])) {
	echo '<table>';
	echo '<th><font color="#fff">商品番号</font></th><th><font color="#fff">商品名</font></th>';
	echo '<th><font color="#fff">価格</font></th><th><font color="#fff">個数</font></th><th><font color="#fff">小計</font></th>';
	$total=0;
	foreach ($_SESSION['product'] as $id=>$product) {
		echo '<tr>';
		echo '<td><font color="#fff">', $id, '</font></td>';
		echo '<td><a href="detail.php?id=', $id, '">', 
			$product['name'], '</a></td>';
		echo '<td><font color="#fff">', $product['price'], '</font></td>';
		echo '<td><font color="#fff">', $product['count'], '</font></td>';
		$subtotal=$product['price']*$product['count'];
		$total+=$subtotal;
		echo '<td><font color="#fff">', $subtotal, '</font></td>';
		echo '<td><a href="cart-delete.php?id=', $id, '">削除</a></td>';
		echo '</tr>';
	}
	echo '<tr><td><font color="#fff">合計</font></td><td></td><td></td><td></td><td><font color="#fff">', $total, 
		'</font></td><td></td></tr></font>';
	echo '</table>';
} else {
	echo '<font color="#fff">カートに商品がありません。</font>';
}
?>
