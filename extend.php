<?php

/*
 * This file is part of fof/pretty-mail.
 *
 * Copyright (c) 2019 - 2021 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

namespace FoF\PrettyMail;

use Flarum\Extend;
use Flarum\Foundation\Application;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    new Extend\Locales(__DIR__.'/resources/locale'),
    function (Application $app) {
        $app->register(Providers\MailerProvider::class);
    },
];
