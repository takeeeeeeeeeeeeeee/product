<!doctype html>
<html lang="ja">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <link rel="stylesheet" href="css/model-i.css">
        <title>Device Shop</title>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand " href="index.php">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav mr-auto">　
                        <li class="nav-item">
                            <a class="nav-link" href="index.php">Home</a>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="cart-show.php">カート</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="purchase-input.php">購入</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="history.php">購入履歴</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="login-input.php">ログイン</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="customer-input.php">会員登録
                            </a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="logout-input.php">ログアウト</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    <article>
        <div class="side">
            <div class="text1">
                <h1>model-i</h1><br>
            </div>
            <div class="text2">
                <p2>
                Our most feature-rich lightweight mouse yet.<br>
                9 Programmable buttons with 2 customizable magnetic<br>
                thumb buttons put you in control.<br>
                Looking at the highly-comfortable ergonomic shape,<br>
                it's hard to believe the Model I is only 69 g.<br>
                </p2>
            </div>
            <p3>7500円</p3>
            <br>
            <br>
            <form action="cart-insert.php" method="post">
                <input type="hidden" name="name" value="model-i">
                <input type="hidden" name="price" value="7500">
                <input type="hidden" name="id" value="4">
                <input type="hidden" name="count">
                
                <p6>数量<select name="count">              
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option></p6></select>  
                <p5><input type="submit" value="カートに追加"></p5>
                
            </form>
        </div> 
    <div class="content">
    
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
            </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="img/model-i.jpg" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="img/model-i2.jpg" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="img/model-i3.jpg" alt="Third slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="img/model-i4.jpg" alt="Fourth slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="img/model-i5.jpg" alt="Fifth slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="img/model-i6.jpg" alt="Sixth slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        <hr>
        </div>

    </div>
</article>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    </body>
</html>