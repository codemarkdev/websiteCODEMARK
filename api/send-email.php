<?php
// Contact -> Resend (Admin + Confirmación Cliente) — CodeMark (Hostinger + .htaccess env)

ini_set('display_errors', 0);
error_reporting(E_ALL);

// CORS (en prod restringe a tu dominio)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'Método no permitido');

$logFile = __DIR__ . '/mail-log.txt';

function writeLog($message, $data = null) {
    global $logFile;
    $ts = date('Y-m-d H:i:s');
    $msg = "[$ts] $message";
    if ($data !== null) $msg .= "\n" . print_r($data, true);
    $msg .= "\n" . str_repeat('-', 80) . "\n";
    @file_put_contents($logFile, $msg, FILE_APPEND | LOCK_EX);
}

function respond($ok, $message, $data = null) {
    $res = ['success' => $ok, 'message' => $message];
    if ($data !== null) $res['data'] = $data;
    echo json_encode($res);
    writeLog("Respuesta enviada: " . ($ok ? "ÉXITO" : "ERROR") . " - $message", $data);
    exit;
}

/** Obtiene la API key desde .htaccess:
 *  - $_SERVER['REDIRECT_RESEND_API_KEY'] (RewriteRule en LiteSpeed)
 *  - $_SERVER['RESEND_API_KEY'] (SetEnv)
 *  - getenv('RESEND_API_KEY')
 */
function getResendKey(): string {
    if (!empty($_SERVER['REDIRECT_RESEND_API_KEY'])) return $_SERVER['REDIRECT_RESEND_API_KEY'];
    if (!empty($_SERVER['RESEND_API_KEY']))          return $_SERVER['RESEND_API_KEY'];
    $g = getenv('RESEND_API_KEY');
    return $g ? $g : '';
}

writeLog("Recibida solicitud POST");

// Lee JSON o x-www-form-urlencoded
$raw = file_get_contents('php://input');
$inputData = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    writeLog("JSON inválido, intentando con \$_POST", $raw);
    $inputData = $_POST;
}
writeLog("Datos recibidos", $inputData);

// Honeypot anti-bots (campo oculto 'hp' debe llegar vacío)
if (!empty($inputData['hp'])) {
    writeLog("Bloqueado por honeypot", $inputData);
    respond(true, 'Ok'); // Fingimos éxito para bots
}

// -------- Validación --------
$errors  = [];
$name    = trim($inputData['name']    ?? '');
$email   = trim($inputData['email']   ?? '');
$phone   = trim($inputData['phone']   ?? '');
$service = trim($inputData['service'] ?? '');
$message = trim($inputData['message'] ?? '');

if ($name === '')    $errors['name']    = 'El nombre es requerido';
if ($message === '') $errors['message'] = 'El mensaje es requerido';
if (!empty($errors)) respond(false, 'Faltan campos requeridos', ['errors' => $errors]);

// Valida email cliente para confirmación/reply-to
$validEmail = null;
if ($email !== '') {
    $san = filter_var($email, FILTER_SANITIZE_EMAIL);
    if ($san && filter_var($san, FILTER_VALIDATE_EMAIL)) $validEmail = $san;
}

// -------- Config --------
$contactEmail = 'contacto@codemark.es';       // Admin destino
$siteName     = 'CodeMark';
$siteUrl      = 'https://codemark.es';

// Remitente DEBE ser de un dominio verificado en Resend
$fromAddress  = 'CodeMark <noreply@codemark.es>';

$serviceTypeMap = [
    'web'          => 'Desarrollo Web Personalizado',
    'security'     => 'Ciberseguridad Avanzada',
    'ai'           => 'Automatización con IA',
    'optimization' => 'Optimización y Rendimiento',
    'marketing'    => 'Marketing Digital',
    'consulting'   => 'Consultas Personalizadas',
    'other'        => 'Otro'
];
$serviceText = $serviceTypeMap[$service] ?? ($service !== '' ? $service : 'No especificado');

$subject = "Nuevo mensaje: $serviceText - $name";

// Helper de escape
$e = fn($v) => htmlspecialchars($v ?? '', ENT_QUOTES, 'UTF-8');

// -------- Cuerpos (ADMIN) --------
$htmlAdmin = '<div style="font-family:\'Segoe UI\',Helvetica,Arial,sans-serif;background:#0b0f1a;padding:40px;color:#e0e0e0;">
  <div style="max-width:600px;margin:auto;background:#131a2c;border-radius:12px;overflow:hidden;box-shadow:0 0 30px rgba(0,0,0,0.3);">
    <div style="background:#001d3d;padding:30px;text-align:center;">
      <h1 style="color:#00b4d8;margin:0;font-size:28px;font-weight:600;">🚀 Nuevo mensaje para CodeMark</h1>
    </div>
    <div style="padding:30px;font-size:16px;line-height:1.7;">
      <p><strong>👤 Nombre:</strong> ' . $e($name) . '</p>
      <p><strong>✉️ Email:</strong> ' . $e($validEmail ?? 'No proporcionado') . '</p>
      <p><strong>📞 Teléfono:</strong> ' . $e($phone) . '</p>
      <p><strong>🧩 Servicio:</strong> ' . $e($serviceText) . '</p>
      <p><strong>💬 Mensaje:</strong><br>' . nl2br($e($message)) . '</p>
    </div>
    <div style="background:#00111a;color:#90e0ef;padding:20px;text-align:center;font-size:14px;">
      <p style="margin:0;">© ' . date('Y') . ' ' . $e($siteName) . ' - Todos los derechos reservados</p>
      <p style="margin:0;"><a href="' . $e($siteUrl) . '" style="color:#00b4d8;text-decoration:none;">' . $e($siteUrl) . '</a></p>
    </div>
  </div>
</div>';

$textAdmin = "Nuevo mensaje de contacto\n"
           . "Nombre: $name\n"
           . "Email: " . ($validEmail ?? 'No proporcionado') . "\n"
           . "Teléfono: $phone\n"
           . "Servicio: $serviceText\n"
           . "Mensaje:\n$message";

writeLog("Preparando envío vía Resend", compact('contactEmail','subject'));

// Cliente Resend (cURL)
function sendViaResend(array $payload) {
    $apiKey = getResendKey();
    if (!$apiKey) {
        writeLog("RESEND_API_KEY no configurada (.htaccess)");
        return [0, json_encode(['error' => 'API key missing'])];
    }
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.resend.com/emails',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
            'Accept: application/json',
            'User-Agent: CodeMark-Mailer/1.0'
        ],
        CURLOPT_TIMEOUT => 20,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);
    $response = curl_exec($ch);
    $errno    = curl_errno($ch);
    $err      = curl_error($ch);
    $status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($errno) writeLog("cURL ERROR #$errno: $err");
    return [$status, $response];
}

// ---- Envío al admin
$payloadAdmin = [
    'from'     => $fromAddress,
    'to'       => [$contactEmail],
    'subject'  => $subject,
    'html'     => $htmlAdmin,
    'text'     => $textAdmin,
    // si el cliente puso email válido, responder te escribe a él
    'reply_to' => $validEmail ? [$validEmail] : null,
];

[$adminStatus, $adminResponse] = sendViaResend($payloadAdmin);

// Acepta cualquier 2xx
if ($adminStatus >= 200 && $adminStatus < 300) {
    writeLog("Correo al admin enviado", ['status' => $adminStatus, 'response' => $adminResponse]);

    // ---- Confirmación al cliente (solo si email válido)
    if ($validEmail) {
        $clientSubject = "Gracias por tu mensaje - $siteName";

        $clientHtml = '<div style="font-family:\'Segoe UI\',Helvetica,Arial,sans-serif;background:#0b0f1a;padding:40px;color:#e0e0e0;">
          <div style="max-width:600px;margin:auto;background:#131a2c;border-radius:12px;overflow:hidden;box-shadow:0 0 25px rgba(0,0,0,0.3);">
            <div style="background:#003566;padding:30px;text-align:center;">
              <h1 style="color:#00b4d8;margin:0;font-size:26px;font-weight:600;">¡Gracias por contactarnos, ' . $e($name) . '!</h1>
            </div>
            <div style="padding:30px;font-size:16px;line-height:1.7;">
              <p>Hemos recibido tu mensaje sobre <strong style="color:#90e0ef;">' . $e($serviceText) . '</strong>. Te responderemos pronto.</p>
              <hr style="border:none;border-top:1px solid #234;"><br>
              <h3 style="margin:0;color:#00b4d8;font-weight:500;">Resumen:</h3>
              <p><strong>📧 Email:</strong> ' . $e($validEmail) . '<br>
              <strong>📱 Teléfono:</strong> ' . $e($phone) . '<br>
              <strong>📝 Mensaje:</strong><br>' . nl2br($e($message)) . '</p>
            </div>
            <div style="background:#00111a;color:#90e0ef;padding:20px;text-align:center;font-size:14px;">
              <p style="margin:0;">© ' . date('Y') . ' ' . $e($siteName) . '</p>
              <p style="margin:0;"><a href="' . $e($siteUrl) . '" style="color:#00b4d8;text-decoration:none;">Visita nuestro sitio</a></p>
            </div>
          </div>
        </div>';

        $clientText = "Gracias por contactarnos, $name!\n\nHemos recibido tu solicitud sobre $serviceText y te responderemos pronto.\n\nSaludos,\nEquipo $siteName";

        $payloadClient = [
            'from'     => $fromAddress,
            'to'       => [$validEmail],
            'subject'  => $clientSubject,
            'html'     => $clientHtml,
            'text'     => $clientText,
            // si responde a la confirmación, que te llegue a ti
            'reply_to' => [$contactEmail],
        ];

        [$clientStatus, $clientResponse] = sendViaResend($payloadClient);
        if (!($clientStatus >= 200 && $clientStatus < 300)) {
            writeLog("Fallo confirmación cliente", ['status' => $clientStatus, 'response' => $clientResponse]);
        } else {
            writeLog("Confirmación cliente enviada", ['status' => $clientStatus, 'response' => $clientResponse]);
        }
    } else {
        writeLog("No se envía confirmación: email inválido o vacío", ['email' => $email]);
    }

    respond(true, 'Mensaje enviado correctamente.');
} else {
    writeLog("Fallo envío admin", ['status' => $adminStatus, 'response' => $adminResponse]);
    respond(false, 'Error al enviar el mensaje.');
}
