# real-aws-status

Modifies the aws status page such that it *actually* shows the status of services.

![example](image.png)

# usage

## from the chrome store

- Install it from [here](https://chrome.google.com/webstore/detail/real-aws-status/kaegondhonfdclembpcgaaammmlfaekj).
- Enjoy!

## from source

- Download the latest crx release from the [releases page](https://github.com/josegonzalez/real-aws-status/releases)
- Drag the release to your Chrome browser on the `chrome://extensions/` page and install
- Enjoy!

# how does it work?

- Grabs all the rows in the status table
- Deletes the rows if the status image is "a-okay"
- Increments the status image in all other cases (except when AWS already says a service is down)

# todo

Whatever is in the issue tracker. Pull requests welcome!
