<?php namespace moay\FlarumNotify\Messages;

use moay\FlarumNotify\Messages\Message;

class DiscussionWasStartedMessage extends Message
{   
	function __construct($discussion){
		$this->discussion = $discussion;
		$this->prepareMessage();
	}

	function prepareMessage(){
		$this->author = $this->discussion->startUser;
		$this->message = 'started discussion #' . $this->discussion->id . ' ('.$this->discussion->title.')';
		$this->short = 'New post';
		$this->color = '713191';

		$this->addLinkToParse('@'.$this->author->username, app('flarum.config')['url']."/u/{$this->author->id}");
		$this->addLinkToParse('discussion #'.$this->discussion->id, app('flarum.config')['url']."/d/{$this->discussion->id}");
	}

}
