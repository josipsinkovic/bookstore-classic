<?php
require_once("../../lib/utils.php");

session_start();

// Destroy session
session_unset();
session_destroy();

// Redirect to home page
Utils::redirect("/");
