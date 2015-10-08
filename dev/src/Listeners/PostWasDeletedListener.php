<?php namespace moay\FlarumNotify\Listeners;

use Flarum\Events\PostWasDeleted;
use Illuminate\Contracts\Events\Dispatcher;
use moay\FlarumNotify\Listeners\NotificationListener;
use moay\FlarumNotify\Messages\PostWasDeletedMessage;

class PostWasDeletedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasDeleted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasDeleted $event
     * @return void
     */
    public function sendMessage(PostWasDeleted $event)
    {
        if($this->shouldTrigger($event)){
            $message = new PostWasDeletedMessage($event->post);

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
    public function shouldTrigger(PostWasDeleted $event){
        if($this->settings->get('notify.events.post_deleted') === '1'
            && $event->post->discussion 
            && $event->post->discussion->posts()->count() != 0){
            return true;
        }
        return false;
    }
}
