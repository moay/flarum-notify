<?php namespace moay\FlarumNotify\Connectors;

use moay\FlarumNotify\Interfaces\ConnectorInterface;
use GuzzleHttp\Client as GuzzleClient;

class GitterConnector extends Connector implements ConnectorInterface
{
    private $webhook = 'https://api.gitter.im/v1/';

    public function setup(){
    	$this->client = new GuzzleClient();
        $this->webhook = $this->settings->get('notify.gitter.webhook');
    }

    public function works(){
        $data = [
            'form_params' => [
                'message' => 'Flarum is able to contact this Gitter room. Great!'
            ]
        ];

        $response = $this->postApi($data);
        return $response->getBody()->getContents() == 'OK';
    }

    public function send($message){
        $level = 'normal';
        if($message->getColor() !== null){
            $level = $this->parseColor($message->getColor());
        }

        $content = $message->getMessage();

        // Prefix with 'Forum activity:'
        $content = '####Flarum activity '."\n\n" . $content;

        if($message->getAuthor() !== null){
            $content = '`@'.$message->getAuthor()->username.'` '. $content;
        }

        $content = $this->parseLinksInMessage($content, $message->getLinksToParse());

        // Remove # for gutter because it will tryl to convert them into issue links
        $content = str_replace('iscussion #', 'iscussion ', $content);

        $data = [
            'form_params' => [
                'message' => $content,
                'level' => $level
            ]
        ];

        return $this->postApi($data);
    }

    protected function getApi($data = []){
        return $this->requestApi('GET', $data);
    }

    protected function postApi($data = []){
        return $this->requestApi('POST', $data);
    }

    private function requestApi($method = 'GET', $data = []){
        return $this->client->request($method, $this->webhook, $data);
    }

    protected function parseColor($color){
        if($color == 'red' || $color == 'orange'){
            return 'error';
        }
        return 'normal';
    }

    protected function parseLinksInMessage($content, $linksToParse){
        foreach($linksToParse as $search=>$link){
            $content = str_replace($search, '['.$search.']('.$link.')', $content);
        }
        return $content;
    }
}
