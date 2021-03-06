export const mailto = `<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
        body {
            font-family: 'Open Sans', sans-serif;
            background: white;
            color: #426799;
            margin: 0;
            padding: 0;
        }
        .content {
            box-sizing: border-box;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 10px 20px;
        }
        .header {
            border-bottom: 1px solid #e8ecf3;
         }
         .header a {
            color: {{ $settings->get('theme_primary_color') }};
            text-decoration: none;
         }
         .footer {
            background: #e8ecf3;
         }
    </style>
    @if ($forumStyle !== '')
    <style>
        {!! $forumStyle !!}
    </style>
    @endif
</head>
<body>
<div class="header">
    <div class="content">
        <a href="{{ $url->to('forum')->base() }}">{{ $settings->get('forum_title') }}</a>
    </div>
</div>
<div class="content">
    {!! $body !!}
</div>
<div class="footer">
    <div class="content">
        <p>Sent from {{ $settings->get('forum_title') }} using FoF Pretty Mail</p>
    </div>
</div>
</body>
</html>`;

export const newPost = `<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
        body {
            font-family: 'Open Sans', sans-serif;
            background: white;
            color: #426799;
            margin: 0;
            padding: 0;
        }
        .content {
            box-sizing: border-box;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 10px 20px;
        }
        .header {
            border-bottom: 1px solid #e8ecf3;
        }
        .header a {
            color: {{ $settings->get('theme_primary_color') }};
            text-decoration: none;
        }
        .footer {
            background: #e8ecf3;
        }
    </style>
    <style>
        {!! $forumStyle !!}
    </style>
</head>
<body>
<div class="header">
    <div class="content">
        <a href="{{ $url->to('forum')->base() }}">{{ $settings->get('forum_title') }}</a>
    </div>
</div>
<div class="content">
    <div class="info">
        <p>Hey {!! $user->display_name !!}!</p>

        <p><a href="{{ $url->to('forum')->route('user', ['username' => $blueprint->post->user->username]) }}">{!! $blueprint->post->user->username !!}</a> made a post in a discussion you're following: <a href="{{ $url->to('forum')->route('discussion', ['id' => $blueprint->post->discussion_id, 'near' => $blueprint->post->number]) }}">{!! $blueprint->post->discussion->title !!}</a></p>

        ---

    </div>
    <br/>
    <div class="post-content">
        {!! $blueprint->post->formatContent() !!}
    </div>
    <br/>
    <div class="info">
        ---

        <p>You won't receive any more notifications about this discussion until you're up-to-date.</p>
    </div>
</div>
<div class="footer">
    <div class="content">
        <p>Sent from {{ $settings->get('forum_title') }} using FoF Pretty Mail</p>
    </div>
</div>
</body>
</html>`;

export const userMentioned = `<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
        body {
            font-family: 'Open Sans', sans-serif;
            background: white;
            color: #426799;
            margin: 0;
            padding: 0;
        }
        .content {
            box-sizing: border-box;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 10px 20px;
        }
        .header {
            border-bottom: 1px solid #e8ecf3;
        }
        .header a {
            color: {{ $settings->get('theme_primary_color') }};
            text-decoration: none;
        }
        .footer {
            background: #e8ecf3;
        }
    </style>
    <style>
        {!! $forumStyle !!}
    </style>
</head>
<body>
<div class="header">
    <div class="content">
        <a href="{{ $url->to('forum')->base() }}">{{ $settings->get('forum_title') }}</a>
    </div>
</div>
<div class="content">
    <div class="info">
        <p>Hey {!! $user->display_name !!}!</p>

        <p><a href="{{!! $url->to('forum')->route('user', ['username' => $blueprint->post->user->username]) !!}}">{!! $blueprint->post->user->username !!}</a> mentioned you in a post in <a href="{{!! $url->to('forum')->route('discussion', ['id' => $blueprint->post->discussion_id, 'near' => $blueprint->post->number]) !!}}">{!! $blueprint->post->discussion->title !!}</a>.</p>

        ---

    </div>
    <br/>
    <div class="post-content">
        {!! $blueprint->post->formatContent() !!}
    </div>
    <br/>
</div>
<div class="footer">
    <div class="content">
        <p>Sent from {{ $settings->get('forum_title') }} using FoF Pretty Mail</p>
    </div>
</div>
</body>
</html>`;

export const postMentioned = `<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
        body {
            font-family: 'Open Sans', sans-serif;
            background: white;
            color: #426799;
            margin: 0;
            padding: 0;
        }
        .content {
            box-sizing: border-box;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 10px 20px;
        }
        .header {
            border-bottom: 1px solid #e8ecf3;
        }
        .header a {
            color: {{ $settings->get('theme_primary_color') }};
            text-decoration: none;
        }
        .footer {
            background: #e8ecf3;
        }
    </style>
    <style>
        {!! $forumStyle !!}
    </style>
</head>
<body>
<div class="header">
    <div class="content">
        <a href="{{ $url->to('forum')->base() }}">{{ $settings->get('forum_title') }}</a>
    </div>
</div>
<div class="content">
    <div class="info">
        <p>Hey {!! $user->display_name !!}!</p>

        <p><a href="{{ $url->to('forum')->route('user', ['username' => $blueprint->reply->user->username]) }}">{!! $blueprint->reply->user->username !!}</a> replied to your post (#{!! $blueprint->post->number !!}) in <a href="{{ $url->to('forum')->route('discussion', ['id' => $blueprint->post->discussion_id, 'near' => $blueprint->reply->number]) }}">{!! $blueprint->post->discussion->title !!}</a>.</p>

        ---

    </div>
    <br/>
    <div class="post-content">
        {!! $blueprint->reply->formatContent() !!}
    </div>
    <br/>
</div>
<div class="footer">
    <div class="content">
        <p>Sent from {{ $settings->get('forum_title') }} using FoF Pretty Mail</p>
    </div>
</div>
</body>
</html>`;
