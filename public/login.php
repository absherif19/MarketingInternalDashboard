<?php
header("Content-Type: application/json");

// Hardcoded users list
$users = [
  ["username" => "admin", "password" => "admin123", "name" => "Admin User", "position" => "Administrator"],
  ["username" => "jamil", "password" => "jamil@2007", "name" => "Jamil Ismail", "position" => "Corporate Marketing Manager"]
];

// Get JSON input from request
$input = json_decode(file_get_contents("php://input"), true);
$username = strtolower(trim($input['username'] ?? ''));
$password = trim($input['password'] ?? '');

// Look for user
$matchedUser = null;
foreach ($users as $user) {
  if (strtolower($user['username']) === $username && $user['password'] === $password) {
    $matchedUser = $user;
    break;
  }
}

if ($matchedUser) {
  echo json_encode([
    "success" => true,
    "user" => [
      "username" => $matchedUser["username"],
      "name" => $matchedUser["name"],
      "position" => $matchedUser["position"]
    ]
  ]);
} else {
  http_response_code(401);
  echo json_encode([
    "success" => false,
    "message" => "Invalid username or password"
  ]);
}
?>
