<?php
// Generar un identificador único para el usuario
$user_id = uniqid();

// Devolver el identificador al cliente
echo json_encode(['user_id' => $user_id]);
?>