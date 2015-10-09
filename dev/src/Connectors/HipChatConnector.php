<?php namespace moay\FlarumNotify\Connectors;

use moay\FlarumNotify\Interfaces\ConnectorInterface;

use GorkaLaucirica\HipchatAPIv2Client\Auth\OAuth2;
use GorkaLaucirica\HipchatAPIv2Client\Client;
use GorkaLaucirica\HipchatAPIv2Client\API\RoomAPI;
use GorkaLaucirica\HipchatAPIv2Client\Model\Message;
use GorkaLaucirica\HipchatAPIv2Client\Exception\RequestException;

class HipChatConnector extends Connector implements ConnectorInterface
{
    /**
     * Setup method which is called on construction
     * @return void
     */
    public function setup(){
        $auth = new OAuth2($this->settings->get('notify.hipchat.token'));
    	$client = new Client($auth);
        $this->api = new RoomAPI($client);
        $this->message = new Message();
    }

    /**
     * Method which actually sends a message to Gitter
     * @param  Message $message
     * @return void
     */
    public function send($message){
        $color = 'gray';
        if($message->getColor() !== null){
            $color = $this->parseColor($message->getColor());
        }

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

    /**
     * Checks wether the Connector works with the current settings
     * @return boolean
     */
    public function works(){
        $this->message->setMessage('Flarum is able to contact this HipChat room. Great!');
        $this->message->setColor('green');
        try{
            $this->api->sendRoomNotification($this->settings->get('notify.hipchat.room'), $this->message);
        } catch(RequestException $e) {
            return false;
        }
        return true;
    }

    /**
     * Parses the message's color to something HipChat understands
     * @param  string $color
     * @return string         string that is usable for HipChat
     */
    protected function parseColor($color){
        $retcolor = 'gray';

        $colors = [
            'red' => 'red',
            'orange' => 'yellow',
            'green' => 'green',
            'blue' => 'purple',
            'special' => 'purple'
        ];

        if(isset($colors[$color])){
             $retcolor = $colors[$color];
        }

        return $retcolor;
    }

    /**
     * Parses all links in the message body to make them clickable
     * @param  string $content      
     * @param  array $linksToParse  string=>link array
     * @return string               the parsed $content
     */
    protected function parseLinksInMessage($content, $linksToParse){
        foreach($linksToParse as $search=>$link){
            $content = str_replace($search, '<a href="'.$link.'">'.$search.'</a>', $content);
        }
        return $content;
    }
}
