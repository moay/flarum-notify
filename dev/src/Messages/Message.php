<?php namespace moay\FlarumNotify\Messages;

class Message
{   
	protected $author = null;
	protected $message = '';
	protected $short = '';
	protected $title = '';
	protected $linksToParse = [];
	protected $color = null;

	/**
	 * Adds links which can be parsed by the connectors to convert strings into links
	 * @param string $string  The string to convert
	 * @param string $url     The url it should lead to
	 */
	protected function addLinkToParse($string, $url){
		$this->linksToParse[$string] = $url;
	}

	public function getAuthor(){
		return $this->author;
	}

	public function getMessage(){
		return $this->message;
	}

	public function getShort(){
		return $this->short;
	}

	public function getTitle(){
		return $this->title;
	}

	public function getColor(){
		return $this->color;
	}

	public function getLinksToParse(){
		return $this->linksToParse;
	}
}
