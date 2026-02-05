<?php session_start(); ?>
<?php require 'menu.php'; ?>
<br>
<?php
$name=$address=$login=$password='';
if (isset($_SESSION['customer'])) {
	$name=$_SESSION['customer']['name'];
	$address=$_SESSION['customer']['address'];
	$login=$_SESSION['customer']['login'];
	$password=$_SESSION['customer']['password'];
}
echo '<form action="customer-output.php" method="post">';
echo '<table>';
echo '<tr><td><font color="#fff">お名前</font></td><td>';
echo '<input type="text" name="name" value="', $name, '">';
echo '</td></tr>';
echo '<tr><td><font color="#fff">ご住所</font></td><td>';
echo '<input type="text" name="address" value="', $address, '">';
echo '</td></tr>';
echo '<tr><td><font color="#fff">ログイン名</font></td><td>';
echo '<input type="text" name="login" value="', $login, '">';
echo '</td></tr>';
echo '<tr><td><font color="#fff">パスワード</font></td><td>';
echo '<input type="password" name="password" value="', $password, '">';
echo '</td></tr>';
echo '</table>';
echo '<div>	<label for="c_agree"><input id="c_agree" type="checkbox" name="agree" value="1" required><font color="#fff">個人情報保護方針に同意します</font></label></div>';
echo '<input type="submit" value="確定">';
echo '</form>';
?>