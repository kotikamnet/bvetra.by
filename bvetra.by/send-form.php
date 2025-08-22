<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';
    $service = $_POST['service'] ?? '';
    
    // Здесь должна быть ваша логика обработки данных
    // Например, отправка на почту или сохранение в БД
    
    // В реальном проекте добавьте валидацию и обработку ошибок
    $success = true; // Замените на реальную проверку
    
    echo json_encode([
        'success' => $success,
        'message' => $success ? 'Форма успешно отправлена' : 'Ошибка при отправке формы'
    ]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Неправильный метод запроса']);