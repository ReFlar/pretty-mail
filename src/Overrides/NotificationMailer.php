<?php

/*
 * Original Copyright Flarum. Licensed under MIT License
 * See license text at https://github.com/flarum/core/blob/master/LICENSE
 */

namespace FoF\PrettyMail\Overrides;

use Flarum\Http\UrlGenerator;
use Flarum\Notification\MailableInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use FoF\PrettyMail\BladeCompiler;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Contracts\View\Factory as View;
use Illuminate\Mail\Message;
use Illuminate\Support\Str;
use s9e\TextFormatter\Bundles\Fatdown;
use Symfony\Component\Translation\TranslatorInterface;

class NotificationMailer extends \Flarum\Notification\NotificationMailer
{
    /**
     * @var View
     */
    protected $view;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    protected $url;

    /**
     * Flarum assets directory, to find out where the css is.
     *
     * @var string
     */
    protected $assets_dir = (__DIR__.'/../../../../public/assets/');

    public function __construct(Mailer $mailer, View $view, SettingsRepositoryInterface $settings, TranslatorInterface $translator, UrlGenerator $url)
    {
        parent::__construct($mailer, $translator);

        $this->view = $view;
        $this->settings = $settings;
        $this->url = $url;
    }

    /**
     * @param MailableInterface $blueprint
     * @param User              $user
     */
    public function send(MailableInterface $blueprint, User $user)
    {
        $viewName = $blueprint->getEmailView()['text'] ?? null;

        if (!$viewName) {
            parent::send($blueprint, $user);

            return;
        }

        if (Str::startsWith($viewName, 'flarum')) {
            $blade = [];
            preg_match("/\.(.*)$/", $viewName, $blade);

            $template = $this->settings->get("fof-pretty-mail.{$blade[1]}");
        }

        if ((bool) (int) $this->settings->get('fof-pretty-mail.includeCSS')) {
            $file = preg_grep('~^forum-.*\.css$~', scandir($this->assets_dir));
        }

        $data = [
            'user'       => $user,
            'blueprint'  => $blueprint,
            'url'        => $this->url,
            'forumStyle' => isset($file) ? file_get_contents($this->assets_dir.reset($file)) : '',
            'settings'   => $this->settings,
        ];

        if (isset($template)) {
            $view = BladeCompiler::render($template, $data);
        } else {
            $body = $this->view->make($viewName, compact('blueprint', 'user'))->render();

            if (strip_tags($body) == $body) {
                $body = Fatdown::render(Fatdown::parse($body));
            }

            $view = BladeCompiler::render($this->settings->get('fof-pretty-mail.mailhtml'), array_merge($data, [
                'body' => $body,
            ]));
        }

        $this->mailer->html(
            $view,
            function (Message $message) use ($blueprint, $user) {
                $message->to($user->email, $user->username)
                    ->subject($blueprint->getEmailSubject($this->translator));
            }
        );
    }
}
