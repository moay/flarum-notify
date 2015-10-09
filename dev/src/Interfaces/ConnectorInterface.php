<?php namespace moay\FlarumNotify\Interfaces;

interface ConnectorInterface 
{
    public function setup();
    
    public function send($message);

    public function works();
}
