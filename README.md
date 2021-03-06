Woolyarn
========

![Woolyarn](http://i.imgur.com/RsLVP88.jpg "Woolyarn")

Woolyarn is a Node.js + Socket.IO + Express.js project boilerplate
It is a library to manage user events and interactions in your realtime application.
It keeps everything synchronized for you.

It offers:

* User class is shared between the client and the server
* Keep users data structure synchronized between client and server
* Manage user join/quit websocket events with Socket.IO
* All connection events are logged on console.log
* Uses [RequireJS](http://requirejs.org/) module loader
* app.js renamed to server.js
* Public directories renamed to css, js, img
* Includes the latest version of minified jQuery
* Server HTTP request logger
* Favicon
* Quick debug console toggable with "\", that shows the current client id and the number of the total connected users

Tired of doing ``express YOUR_PROJECT_NAME`` and having to:

* rename files, make new ones,
* then configure your app to support Socket.IO interaction and
* manage user data structure, with join/quit/synchronization events?

Try Woolyarn!

Examples of projects based on Woolyarn:

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

1. Clone the repository with ``git clone git://github.com/Fabryz/woolyarn.git YOUR_PROJECT_NAME``
2. Install dependencies with ``npm install``
3. Start the server with ``NODE_ENV=development node server.js``
4. Point your browser to ``<YOUR_SERVER_IP>:8080``
5. [Congratulate yourself](http://i.imgur.com/WAxOG.gif) for the time you have now gained, start developing

License
-------

Copyright (C) 2013 Fabrizio Codello

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.