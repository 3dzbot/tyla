<?php

/* https://api.telegram.org/bot916141278:AAEDzoiwrnVvwdY8386rRdZpDtmy0Cuq0zE/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

//936006459:AAEZFCmCpxCaGMq5Z_Wc9gAzaMJ1cOtFRLY

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$token = "916141278:AAEDzoiwrnVvwdY8386rRdZpDtmy0Cuq0zE";
$chat_id = "-345391311";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>