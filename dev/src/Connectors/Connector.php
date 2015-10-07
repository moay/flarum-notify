<?php namespace moay\FlarumNotify\Connectors;

use Flarum\Core\Settings\SettingsRepository;

class Connector
{   
    public function __construct(SettingsRepository $settings){
        $this->settings = $settings;
        $this->setup();
    }
}
