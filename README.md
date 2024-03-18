# Module planetrise

Calculates and display the rise and set times of the planets for [MagicMirror²](https://magicmirror.builders/).

This module is powered with Don Cross's javascript library [astronomy.js](https://github.com/cosinekitty/astronomy).

## Screenshot

[Screenshot](screenshot.png)

## Installation

Just clone the module into your modules folder of your MagicMirror²:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/croxis/planetrise
```

## Configuration

To use this module, add it to the modules array in the `config/config.js` file:

```javascript
    {
        module: "planetrise",
        position: "top_right", // This can be any of the regions.
        header: "Planet Rise",
        config: {  // Place the latitude and longitude of your mirror
            latitude: 45.5,
            longitude: -122.38,
            // A dictiory of the bodies and unicode character for the symbol
            // This is the default and does not need to be listed.
            // A full list of bodies can be seen on line 1359 in astronomy.js
            // Note: Trying to find the rise time of Earth will crash the module
            bodies: {
                Sun: "☉",
                Moon: "☽",
                Mercury: "☿",
                Venus: "♀",
                Mars: "♂",
                Jupiter: "♃",
                Saturn: "♄"
            }
        }
    },
```

## Update

Go to the module’s folder inside MagicMirror modules folder and pull the latest version from GitHub:

```bash
cd ~/MagicMirror/modules/planetrise
```
