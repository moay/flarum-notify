<?php namespace moay\FlarumNotify\Listeners;

use Flarum\Events\PostWasPosted;
use Illuminate\Contracts\Events\Dispatcher;
use moay\FlarumNotify\Listeners\NotificationListener;
use moay\FlarumNotify\Messages\PostWasPostedMessage;

class PostWasPostedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasPosted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasPosted $event
     * @return void
     */
    public function sendMessage(PostWasPosted $event)
    {
        if($this->shouldTrigger($event)){
            $message = new PostWasPostedMessage($event->post);

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
    public function shouldTrigger(PostWasPosted $event){
        if($this->settings->get('notify.events.new_post') === '1'
            && $event->post->discussion->posts()->count() > 1){
            return true;
        }
        return false;
    }
}
