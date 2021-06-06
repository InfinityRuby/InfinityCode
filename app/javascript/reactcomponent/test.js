<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <script>
  fetch('http://localhost:3000/api/v1/posts/1/totallike')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
  const like = document.getElementsByClassName("like");
  </script>
</head>
<body>
  <a class="like" href="http://localhost:3000/api/v1/posts/1/like">like</a>
</body>
</html>





