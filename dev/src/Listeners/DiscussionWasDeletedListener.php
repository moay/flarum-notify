<?php namespace moay\FlarumNotify\Listeners;

use Flarum\Events\DiscussionWasDeleted;
use Illuminate\Contracts\Events\Dispatcher;
use moay\FlarumNotify\Listeners\NotificationListener;
use moay\FlarumNotify\Messages\DiscussionWasDeletedMessage;

class DiscussionWasDeletedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {   
        $events->listen(DiscussionWasDeleted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasPosted $event
     * @return void
     */
    public function sendMessage(DiscussionWasDeleted $event)
    {   
        if($this->shouldTrigger($event)){
            $message = new DiscussionWasDeletedMessage($event->discussion);

            foreach($this->getConnectorsToNotify() as $connector){
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  DiscussionWasDeleted $event
     * @return boolean
     */
    public function shouldTrigger(DiscussionWasDeleted $event){
        if($this->settings->get('notify.events.discussion_deleted') === '1'){
            return true;
        }
        return false;
    }
}
