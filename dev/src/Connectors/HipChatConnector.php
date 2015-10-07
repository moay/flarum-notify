<?php namespace moay\FlarumNotify\Connectors;

use moay\FlarumNotify\Interfaces\ConnectorInterface;

use GorkaLaucirica\HipchatAPIv2Client\Auth\OAuth2;
use GorkaLaucirica\HipchatAPIv2Client\Client;
use GorkaLaucirica\HipchatAPIv2Client\API\RoomAPI;
use GorkaLaucirica\HipchatAPIv2Client\Model\Message;

class HipChatConnector extends Connector implements ConnectorInterface
{
    public function setup(){
        $auth = new OAuth2($this->settings->get('notify.hipchat.token'));
    	$client = new Client($auth);
        $this->api = new RoomAPI($client);
        $this->message = new Message();
    }

    public function send($message){
        $color = 'gray';
        $content = $message->getMessage();

        if($message->getAuthor() !== null){
            $content = '@'.$message->getAuthor()->username.' '. $content;
        }

        $content = $this->parseLinksInMessage($content, $message->getLinksToParse());

        $this->message->setColor($color);
        $this->message->setNotify(true);
        $this->message->setMessage($content);

        $this->api->sendRoomNotification($this->settings->get('notify.hipchat.room'), $this->message);
    }

    protected function parseLinksInMessage($content, $linksToParse){
        foreach($linksToParse as $search=>$link){
            $content = str_replace($search, '<a href="'.$link.'">'.$search.'</a>', $content);
        }
        return $content;
    }
}
