Default
======

Default Node.js + Socket.IO + jQuery + Express.js project boilerplate

Tired of doing ``express YOUR_PROJECT_NAME`` and having to:

* rename files, make new ones,
* then configure your app to support Socket.IO interaction and
* manage user data structure, with join/quit/synchronization events?

Try Default!

It offers:

* app.js renamed to server.js
* Public directories renamed to css, js, img
* Includes latest version of minified jQuery 
* Server HTTP request logger
* Favicon


* User class shared between client and server
* Keep users data structure synchronized between client and server
* Manage user join/quit websocket events with Socket.IO
* All connection events are logged on console.log


* Debug console toggable with "\", show number of total connected users and their session id

Examples of projects based on Default:

* [Wander](https://github.com/Fabryz/wander)
* [Mangonel](https://github.com/Fabryz/mangonel)
* [Mirror](https://github.com/Fabryz/mirror)
* [Closer](https://github.com/Fabryz/closer)

Requirements
------------

* [Node.js](http://nodejs.org/)
* [Npm](http://npmjs.org/)

Modules:

* [Express](http://expressjs.com/)
* [Socket.io](http://socket.io/)

Installation
----------

1. Clone the repository with ``git clone git://github.com/Fabryz/default.git YOUR_PROJECT_NAME``
2. Install dependencies with ``npm install``
3. Start the server with ``node server.js``
4. Point your browser to ``YOUR_SERVER_IP:8080``
5. [Congratulate yourself](http://i.imgur.com/WAxOG.gif) for the time you have now gained, start developing

License
-------

MIT License

Copyright (c) 2012 Fabrizio Codello

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.