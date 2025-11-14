<?php
require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php';
$APPLICATION->SetTitle('FASTonline');

$staticFile = __DIR__ . '/docs/index.html';
$content = is_file($staticFile) ? file_get_contents($staticFile) : null;

if ($content === false || $content === null) {
    echo '<p>Не удалось загрузить статический контент.</p>';
} else {
    $content = preg_replace('~^.*?<body[^>]*>~is', '', $content);
    $content = preg_replace('~</body>.*$~is', '', $content);
    echo $content;
}

require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php';

