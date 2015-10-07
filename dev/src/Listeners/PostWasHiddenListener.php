<?php namespace moay\FlarumNotify\Listeners;

use Flarum\Events\PostWasHidden;
use Illuminate\Contracts\Events\Dispatcher;
use moay\FlarumNotify\Listeners\NotificationListener;
use moay\FlarumNotify\Messages\PostWasHiddenMessage;

class PostWasHiddenListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasHidden::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasHidden $event
     * @return void
     */
    public function sendMessage(PostWasHidden $event)
    {
        if($this->shouldTrigger($event)){
            $message = new PostWasHiddenMessage($event->post);

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
    public function shouldTrigger(PostWasHidden $event){
        if($this->settings->get('notify.events.post_hidden') === '1'){
            return true;
        }
        return false;
    }
}
