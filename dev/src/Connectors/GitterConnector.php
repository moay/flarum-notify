<?php namespace moay\FlarumNotify\Connectors;

use moay\FlarumNotify\Interfaces\ConnectorInterface;
use GuzzleHttp\Client as GuzzleClient;

class GitterConnector extends Connector implements ConnectorInterface
{
    private $webhook = 'https://api.gitter.im/v1/';

    /**
     * Setup method which is called on construction
     * @return void
     */
    public function setup(){
    	$this->client = new GuzzleClient();
        $this->webhook = $this->settings->get('notify.gitter.webhook');
    }

    /**
     * Checks wether the Connector works with the current settings
     * @return boolean
     */
    public function works(){
        $data = [
            'form_params' => [
                'message' => 'Flarum is able to contact this Gitter room. Great!'
            ]
        ];

        $response = $this->postApi($data);
        return $response->getBody()->getContents() == 'OK';
    }

    /**
     * Method which actually sends a message to Gitter
     * @param  Message $message
     * @return GuzzleResponse
     */
    public function send($message){
        $level = 'normal';
        if($message->getColor() !== null){
            $level = $this->parseColor($message->getColor());
        }


        // Prefix with 'Forum activity:'
        $content = '####Flarum activity '."\n\n";

        if($message->getAuthor() !== null){
            $content .= '@'.$message->getAuthor()->username.' ';
        }

        $content .= $message->getMessage();

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

    /**
     * Executes a GET query via requestApi
     */
    protected function getApi($data = []){
        return $this->requestApi('GET', $data);
    }

    /**
     * Executes a POST query via requestApi
     */
    protected function postApi($data = []){
        return $this->requestApi('POST', $data);
    }

    /**
     * Executes a Guzzle request
     * @param  string $method
     * @param  array  $data   
     * @return GuzzleResponse
     */
    private function requestApi($method = 'GET', $data = []){
        return $this->client->request($method, $this->webhook, $data);
    }

    /**
     * Parses the message's color to something Gitter understands
     * @param  string $color
     * @return string        'error' or 'normal'
     */
    protected function parseColor($color){
        if($color == 'red' || $color == 'orange'){
            return 'error';
        }
        return 'normal';
    }

    /**
     * Parses all links in the message body to make them clickable
     * @param  string $content      
     * @param  array $linksToParse  string=>link array
     * @return string               the parsed $content
     */
    protected function parseLinksInMessage($content, $linksToParse){
        foreach($linksToParse as $search=>$link){
            $content = str_replace($search, '['.$search.']('.$link.')', $content);
        }
        return $content;
    }
}
