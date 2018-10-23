class Person {
    constructor(minTimeout, maxTimeout, minEnterTime, maxEnterTime) {
        this.timeout = minTimeout + Math.random() * maxTimeout;
        this.enterTime = minEnterTime + Math.random() * maxEnterTime;
        this.state = "WAITING";
    }

    update() {
        if (this.timeout < 0) {
            this.state = "BIKE";
        }
        else {
            this.timeout--;
        }
    }

    cannotEnter() {
        if (Math.random() > 0.5) {
            this.state = "BIKE";
        }
    }
}