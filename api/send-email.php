<?php
// Script para enviar correos usando Resend API con cURL para CodeMark (cliente y admin)
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$logFile = __DIR__ . '/mail-log.txt';

function writeLog($message, $data = null) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message";
    if ($data !== null) {
        $logMessage .= "\n" . print_r($data, true);
    }
    $logMessage .= "\n" . str_repeat('-', 80) . "\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}

function respond($success, $message, $data = null) {
    $response = [ 'success' => $success, 'message' => $message ];
    if ($data !== null) $response['data'] = $data;
    echo json_encode($response);
    writeLog("Respuesta enviada: " . ($success ? "ÉXITO" : "ERROR") . " - $message", $data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'Método no permitido');

writeLog("Recibida solicitud POST");

$inputJSON = file_get_contents('php://input');
$inputData = json_decode($inputJSON, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    writeLog("JSON inválido, intentando con POST", $inputJSON);
    $inputData = $_POST;
}

writeLog("Datos recibidos", $inputData);

if (empty($inputData['name']) || empty($inputData['message'])) {
    $errors = [];
    if (empty($inputData['name'])) $errors['name'] = 'El nombre es requerido';
    if (empty($inputData['message'])) $errors['message'] = 'El mensaje es requerido';
    respond(false, 'Faltan campos requeridos', ['errors' => $errors]);
}

$name = htmlspecialchars($inputData['name']);
$email = filter_var($inputData['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($inputData['phone'] ?? '');
$service = htmlspecialchars($inputData['service'] ?? '');
$message = htmlspecialchars($inputData['message']);

$contactEmail = 'info@codemark.es';
$emailFrom = 'info@codemark.es';
$siteName = 'CodeMark';
$siteUrl = 'https://codemark.es';

$serviceTypeMap = [
    'web' => 'Desarrollo Web Personalizado',
    'security' => 'Ciberseguridad Avanzada',
    'ai' => 'Automatización con IA',
    'optimization' => 'Optimización y Rendimiento',
    'marketing' => 'Marketing Digital',
    'consulting' => 'Consultas Personalizadas',
    'other' => 'Otro'
];
$serviceText = $serviceTypeMap[$service] ?? $service;

$subject = "Nuevo mensaje: $serviceText - $name";

$html = '<div style="font-family:\'Segoe UI\',Helvetica,Arial,sans-serif;background:#0b0f1a;padding:40px;color:#e0e0e0;">
  <div style="max-width:600px;margin:auto;background:#131a2c;border-radius:12px;overflow:hidden;box-shadow:0 0 30px rgba(0,0,0,0.3);">
    <div style="background:#001d3d;padding:30px;text-align:center;">
      <h1 style="color:#00b4d8;margin:0;font-size:28px;font-weight:600;">🚀 Nuevo mensaje para CodeMark</h1>
    </div>
    <div style="padding:30px;font-size:16px;line-height:1.7;">
      <p><strong>👤 Nombre:</strong> ' . $name . '</p>
      <p><strong>✉️ Email:</strong> ' . $email . '</p>
      <p><strong>📞 Teléfono:</strong> ' . $phone . '</p>
      <p><strong>🧩 Servicio:</strong> ' . $serviceText . '</p>
      <p><strong>💬 Mensaje:</strong><br>' . nl2br($message) . '</p>
    </div>
    <div style="background:#00111a;color:#90e0ef;padding:20px;text-align:center;font-size:14px;">
      <p style="margin:0;">© ' . date('Y') . ' CodeMark - Todos los derechos reservados</p>
      <p style="margin:0;"><a href="' . $siteUrl . '" style="color:#00b4d8;text-decoration:none;">' . $siteUrl . '</a></p>
    </div>
  </div>
</div>';

$text = "Nuevo mensaje de contacto\n"
      . "Nombre: $name\n"
      . "Email: $email\n"
      . "Teléfono: $phone\n"
      . "Servicio: $serviceText\n"
      . "Mensaje:\n$message";

writeLog("Preparando envío vía Resend", compact('emailFrom', 'contactEmail', 'subject'));

function sendEmail($to, $subject, $html, $text) {
    $payload = [
        'from' => 'CodeMark <info@codemark.es>',
        'to' => is_array($to) ? $to : [$to],
        'subject' => $subject,
        'html' => $html,
        'text' => $text,
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.resend.com/emails',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer re_UWB9UNfT_BuJnoGP87U1zPAL79gWt1jZQ',
            'Content-Type: application/json',
        ],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [$httpCode, $response];
}

[$adminStatus, $adminResponse] = sendEmail($contactEmail, $subject, $html, $text);

if ($adminStatus === 200 || $adminStatus === 202) {
    writeLog("Correo al admin enviado", ['status' => $adminStatus, 'response' => $adminResponse]);

    $clientSubject = "Gracias por tu mensaje - CodeMark";
    $clientHtml = '<div style="font-family:\'Segoe UI\',Helvetica,Arial,sans-serif;background:#0b0f1a;padding:40px;color:#e0e0e0;">
      <div style="max-width:600px;margin:auto;background:#131a2c;border-radius:12px;overflow:hidden;box-shadow:0 0 25px rgba(0,0,0,0.3);">
        <div style="background:#003566;padding:30px;text-align:center;">
          <h1 style="color:#00b4d8;margin:0;font-size:26px;font-weight:600;">¡Gracias por contactarnos, ' . $name . '!</h1>
        </div>
        <div style="padding:30px;font-size:16px;line-height:1.7;">
          <p>Hemos recibido tu mensaje sobre <strong style="color:#90e0ef;">' . $serviceText . '</strong>. Uno de nuestros expertos se pondrá en contacto contigo lo antes posible.</p>
          <hr style="border:none;border-top:1px solid #234;"><br>
          <h3 style="margin:0;color:#00b4d8;font-weight:500;">Resumen:</h3>
          <p><strong>📧 Email:</strong> ' . $email . '<br>
          <strong>📱 Teléfono:</strong> ' . $phone . '<br>
          <strong>📝 Mensaje:</strong><br>' . nl2br($message) . '</p>
        </div>
        <div style="background:#00111a;color:#90e0ef;padding:20px;text-align:center;font-size:14px;">
          <p style="margin:0;">© ' . date('Y') . ' CodeMark</p>
          <p style="margin:0;"><a href="' . $siteUrl . '" style="color:#00b4d8;text-decoration:none;">Visita nuestro sitio</a></p>
        </div>
      </div>
    </div>';

    $clientText = "Gracias por contactarnos, $name!\n\nHemos recibido tu solicitud sobre $serviceText y te responderemos pronto.\n\nSaludos,\nEquipo CodeMark";

    [$clientStatus, $clientResponse] = sendEmail($email, $clientSubject, $clientHtml, $clientText);

    if ($clientStatus === 200 || $clientStatus === 202) {
        writeLog("Correo al cliente enviado", ['status' => $clientStatus, 'response' => $clientResponse]);
    } else {
        writeLog("Fallo al enviar confirmación al cliente", ['status' => $clientStatus, 'response' => $clientResponse]);
    }

    respond(true, 'Mensaje enviado correctamente.');

} else {
    writeLog("Fallo al enviar correo al admin", ['status' => $adminStatus, 'response' => $adminResponse]);
    respond(false, 'Error al enviar el mensaje.');
}
?>
