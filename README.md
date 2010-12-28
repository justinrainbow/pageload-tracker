# Web Timing API #


This is an attempt to make an easy wrapper to the Web Timing API.
Which sends results back to a reporting server.



## Requirements for included reporting-server ##

The `reporting-server.js` example server has the following dependencies.

 * Node.js
 * npm modules
   * `opts' - https://bitbucket.org/mazzarelli/js-opts
   * `redis-node`
 * Redis server


## Installation ##

Clone the repository

    git clone https://github.com/justinrainbow/pageload-tracker.git

Then start the server.

    cd pageload-tracker/examples
    node reporting-server.js
