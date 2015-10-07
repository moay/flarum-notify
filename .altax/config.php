<?php
// Autoloading for plugin command classes.
if (is_file(__DIR__ . '/vendor/autoload.php')) require_once __DIR__ . '/vendor/autoload.php';

// ***************************************************************
// Server definition.
// ***************************************************************
//
// Examples:
//
//   Server::node("web1.example.com", array("web", "production"));
//   Server::node("web2.example.com", array("web", "production"));
//   Server::node("db1.example.com",  array("db", "production"));
//   Server::node("dev1.example.com", "development");
//

// ***************************************************************
// Task definition.
// ***************************************************************
//
// Examples:
//
//   Task::register('hello', function($task){
//
//       $task->writeln("Hello world!");
//
//   });
//
