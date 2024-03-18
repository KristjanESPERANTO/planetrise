// Helper functions from http://cosinekitty.com/solar_system.html
const BriefDayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function BriefTimeString (date) {
    if (date == null) {
        return "";
    }
    let h = date.getHours();
    h = (h < 10 ? "0" : "") + h.toString();
    let m = date.getMinutes();
    m = (m < 10 ? "0" : "") + m.toString();
    let s = date.getSeconds();
    s = (s < 10 ? "0" : "") + s.toString();
    return `${BriefDayOfWeek[date.getDay()]} ${h}:${m}:${s}`;
}


function BriefDayValueString (day) {
    if (day == null) {
        return "";
    }
    return BriefTimeString(Astronomy.DayValueToDate(day));
}

Module.register("planetrise", {
    defaults: {
        latitude: 34.2,
        longitude: -118.1,
        // bodies: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn']
        bodies: {
            Sun: "☉",
            Moon: "☽",
            Mercury: "☿",
            Venus: "♀",
            Mars: "♂",
            Jupiter: "♃",
            Saturn: "♄"
        }
    },
    // Define start sequence.
    start () {
        Log.info(`Starting module: ${this.name}`);

        // Schedule update interval.
        const self = this;
        setInterval(() => {
            self.updateDom();
        }, 1000 * 60);
    },
    // Override dom generator.
    getDom () {
        latitude = this.config.latitude;
        longitude = this.config.longitude;

        const wrapper = document.createElement("table");
        wrapper.className = "small";

        const AstroDateTime = new Date();
        const day = Astronomy.DayValue(AstroDateTime);
        const location = new GeographicCoordinates(longitude, latitude, 0);

        for (const i in Astronomy.Body) {
            // AddRowForCelestialBody (Astronomy.Body[i], day);
            if (Object.keys(this.config.bodies).indexOf(Astronomy.Body[i].Name) >= 0) {
                const planetWrapper = document.createElement("tr");
                planetWrapper.className = "normal";
                const symbolWrapper = document.createElement("td");
                symbolWrapper.className = "symbol";

                // If fontio ever supports the full set
                // let symbol =  document.createElement("span");
                // symbol.className = "fa fa-" + this.config.bodies[Astronomy.Body[i].Name];
                // symbolWrapper.appendChild(symbol);

                symbolWrapper.innerHTML = `<center>${this.config.bodies[Astronomy.Body[i].Name]}</center>`;
                planetWrapper.appendChild(symbolWrapper);
                const titleWrapper = document.createElement("td");
                titleWrapper.innerHTML = Astronomy.Body[i].Name;
                titleWrapper.className = "title bright";
                planetWrapper.appendChild(titleWrapper);
                const riseWrapper = document.createElement("td");
                riseWrapper.className = "time light";
                riseWrapper.innerHTML = BriefDayValueString(Astronomy.NextRiseTime(Astronomy.Body[i], day, location));
                planetWrapper.appendChild(riseWrapper);
                const setWrapper = document.createElement("td");
                setWrapper.className = "time light";
                setWrapper.innerHTML = BriefDayValueString(Astronomy.NextSetTime(Astronomy.Body[i], day, location));
                planetWrapper.appendChild(setWrapper);
                // planetWrapper.innerHTML = Object.keys(Astronomy.Body[i]).toString();
                wrapper.appendChild(planetWrapper);
            }
        }
        // wrapper.innerHTML = make_text(sun_elevation, next, julian_date);
        return wrapper;
    },
    getScripts () {
        return ["astronomy.js"];
    }
});
