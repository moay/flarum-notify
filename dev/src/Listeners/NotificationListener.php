<?php namespace moay\FlarumNotify\Listeners;

use Flarum\Core\Settings\SettingsRepository;
use moay\FlarumNotify\Connectors\SlackConnector;
use moay\FlarumNotify\Connectors\HipChatConnector;
use moay\FlarumNotify\Connectors\GitterConnector;

class NotificationListener
{
    protected $settings;

    public function __construct(SettingsRepository $settings)
    {
        $this->settings = $settings;
        new HipChatConnector($this->settings);
    }

    /**
     * Returns all connectors that need to be notified
     * @return array  The connectors
     */
    protected function getConnectorsToNotify(){
        $connectors = [];
        // Check for slack
        if($this->settings->get('notify.services.slack') && $this->settings->get('notify.slack.token') && $this->settings->get('notify.slack.channel')){
            $connectors[] = new SlackConnector($this->settings);
        }
        // Check for HipChat
        if($this->settings->get('notify.services.hipchat') && $this->settings->get('notify.hipchat.token') && $this->settings->get('notify.hipchat.room')){
            $connectors[] = new HipChatConnector($this->settings);
        }
        // Check for Gitter
        if($this->settings->get('notify.services.gitter') && $this->settings->get('notify.gitter.webhook')){
            $connectors[] = new GitterConnector($this->settings);
        }
        return $connectors;
    }
}
