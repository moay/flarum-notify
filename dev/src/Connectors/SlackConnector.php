<?php namespace moay\FlarumNotify\Connectors;

use CL\Slack\Transport\ApiClient;
use CL\Slack\Payload\ChatPostMessagePayload;
use CL\Slack\Payload\AuthTestPayload;
use CL\Slack\Model\Attachment;
use CL\Slack\Model\AttachmentField;
use moay\FlarumNotify\Interfaces\ConnectorInterface;

class SlackConnector extends Connector implements ConnectorInterface
{
    private $iconLocation = '/extensions/slack/img/flarum_slack_icon_48.png';

    public function setup(){
    	$this->client = new ApiClient($this->settings->get('notify.slack.token'));
    }

    public function prepareNotificationPayload(){
        $this->payload = new ChatPostMessagePayload();
        $this->payload->setChannel($this->settings->get('notify.slack.channel'));
        $this->payload->setIconUrl(app('flarum.config')['url'] . $this->iconLocation);
        $this->payload->setUsername('Flarum');

        $this->attachment = new Attachment;
    }

    public function works(){
        $this->payload = new AuthTestPayload;
        $test = $this->execute();
        return $test->isOk();
    }

    public function send($message){
        $this->prepareNotificationPayload();
        $this->setMessage($message->getMessage(), $message->getShort());
        $this->parseLinksInMessage($message->getLinksToParse());
        if($message->getAuthor() !== null){
            $this->setAuthor($message->getAuthor()->username, app('flarum.config')['url']."/u/{$message->getAuthor()->id}", $message->getAuthor()->avatar_url);
            if($message->getAuthor()->isAdmin())
            {
                $this->setColor('special');
            }
        }
        if($message->getColor() !== null){
            $this->setColor($message->getColor());
        }
        if($message->getTitle() !== ''){
            $this->setTitle($message->getTitle());
        }
        $this->sendMessage();
    }

    protected function setMessage($message, $fallback = false){
        if($fallback !== false){
            $this->setFallback($fallback);
        }
        else{
            $this->setFallback($message);
        }
        return $this->attachment->setText($message);
    }

    protected function setTitle($title){
        $this->attachment->setTitle($title);
    }

    protected function setFallback($fallback){
        $this->attachment->setFallback($fallback);
    }

    protected function setColor($color){
        $finalcolor = '777777';

        $colors = [
            'red' => 'C20000',
            'orange' => 'F2C200',
            'green' => '713191',
            'gray' => '777777',
            'default' => '777777',
            'blue' => '609EB3',
            'special' => '609EB3'
        ];

        if(isset($colors[$color])){
            $finalcolor = $colors[$color];
        }

        return $this->attachment->setColor($finalcolor);
    }

    protected function setAuthor($name, $link = false, $icon = null){
        $this->attachment->setAuthorName($name);
        if($link !== false){
            $this->attachment->setAuthorLink($link);
        }
        if($icon !== null){
            $this->attachment->setAuthorIcon($icon);
        }
    }

    protected function sendMessage(){
        $this->payload->addAttachment($this->attachment);

        return $this->execute();
    }

    private function execute(){
    	return $this->client->send($this->payload);
    }

    protected function parseLinksInMessage($linksToParse){
        $message = $this->attachment->getText();
        foreach($linksToParse as $search=>$link){
            $message = str_replace($search, '<'.$link.'|'.$search.'>', $message);
        }
        $this->setMessage($message);
    }
}
