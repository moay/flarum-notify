<?php namespace moay\FlarumNotify\Api;

use Flarum\Core\Settings\SettingsRepository;
use Zend\Diactoros\Response\JsonResponse;
use Illuminate\Contracts\Bus\Dispatcher;
use moay\FlarumNotify\Connectors\SlackConnector;
use moay\FlarumNotify\Connectors\HipChatConnector;
use moay\FlarumNotify\Connectors\GitterConnector;

class ConnectorTest{

    /**
     * @var Dispatcher
     */
    protected $bus;
    /**
     * @var Settings
     */
    protected $settings;

	public function __construct(SettingsRepository $settings, Dispatcher $bus){
		$this->settings = $settings;
        $this->bus = $bus;
	}

	/**
	 * Handles the incoming api request and serves it with a Connector test if possible
	 * @param  $request
	 * @return JsonResponse
	 */
	public function handle($request){
		switch($request->input['connector']){
			case 'slack':
			case 'Slack':
				$slackInstance = new SlackConnector($this->settings);
				$return = ['success'=> $slackInstance->works()];
				break;
			case 'hipchat':
			case 'HipChat':
				$hipChatInstance = new HipChatConnector($this->settings);
				$return = ['success'=> $hipChatInstance->works()];
				break;
			case 'gitter':
			case 'Gitter':
				$gitterInstance = new GitterConnector($this->settings);
				$return = ['success'=> $gitterInstance->works()];
				break;
			default:
				$return = ['success'=>false, 'msg'=>'unknown'];
		}
		return new JsonResponse($return);
	}

}