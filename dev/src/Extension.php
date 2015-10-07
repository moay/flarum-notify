<?php namespace moay\FlarumNotify;

use Flarum\Support\Extension as BaseExtension;
use Illuminate\Events\Dispatcher;

class Extension extends BaseExtension
{
    public function listen(Dispatcher $events)
    {
        $events->subscribe('moay\FlarumNotify\Listeners\AddClientAssets');
        $events->subscribe('moay\FlarumNotify\Listeners\PostWasPostedListener');
        $events->subscribe('moay\FlarumNotify\Listeners\PostWasHiddenListener');
        $events->subscribe('moay\FlarumNotify\Listeners\PostWasDeletedListener');
        $events->subscribe('moay\FlarumNotify\Listeners\DiscussionWasStartedListener');
        $events->subscribe('moay\FlarumNotify\Listeners\DiscussionWasDeletedListener');
    }
}
