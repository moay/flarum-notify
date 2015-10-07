<?php namespace moay\FlarumNotify\Listeners;

use Flarum\Events\DiscussionWasStarted;
use Illuminate\Contracts\Events\Dispatcher;
use moay\FlarumNotify\Listeners\NotificationListener;
use moay\FlarumNotify\Messages\DiscussionWasStartedMessage;

class DiscussionWasStartedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {   
        $events->listen(DiscussionWasStarted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasPosted $event
     * @return void
     */
    public function sendMessage(DiscussionWasStarted $event)
    {   
        if($this->shouldTrigger($event)){
            $message = new DiscussionWasStartedMessage($event->discussion);

            foreach($this->getConnectorsToNotify() as $connector){
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  DiscussionWasStarted $event
     * @return boolean
     */
    public function shouldTrigger(DiscussionWasStarted $event){
        if($this->settings->get('notify.events.new_discussion') === '1'){
            return true;
        }
        return false;
    }
}
