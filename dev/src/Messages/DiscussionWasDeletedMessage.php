<?php namespace moay\FlarumNotify\Messages;

use moay\FlarumNotify\Messages\Message;

class DiscussionWasDeletedMessage extends Message
{   
	function __construct($discussion){
		$this->discussion = $discussion;
		$this->prepareMessage();
	}

	function prepareMessage(){
		$this->title = 'Discussion deleted';
		$this->message = 'Discussion #' . $this->discussion->id . ' ('.$this->discussion->title.') has been deleted';
		$this->short = 'Discussion deleted';
		$this->color = 'C20000';
	}

}
