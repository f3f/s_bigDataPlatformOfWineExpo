var forge = require("./forge");
var EventDispatcher = require("./EventDispatcher");

/**
 * 计时器实现，它使您能按指定的时间序列运行代码。
 * @author Molay
 * @param {number} delay 计时器事件间的延迟（以毫秒为单位）。建议delay不要低于20毫秒。
 * 计时器频率不得超过60帧/秒，这意味着低于16.6毫秒的延迟可导致出现运行时问题。
 * 当延迟设置为Timer.REQUEST_ANIMATION_FRAME时,意味着计时器将基于requestAnimationFrame实现.
 * @param {number} [repeatCount] 指定重复次数。如果为0，则计时器重复无限次数。
 * 如果不为0，则将运行计时器，运行次数为指定的次数，然后停止。
 * @constructor
 */
function Timer(delay, repeatCount) {
    EventDispatcher.call(this);

    this._run = this._run.bind(this);
    this._setIntervalHandler = this._setIntervalHandler.bind(this);
    this._requestAnimationFrameHandler = this._requestAnimationFrameHandler.bind(this);

    this.delay(delay);
    this.repeatCount(repeatCount || 0);
}
///**
// * 指示使用setInterval实现计时器.
// * @type {number}
// */
//Timer.SET_INTERVAL = 0x00;
/**
 * 指示使用requestAnimationFrame实现计时器.
 * @type {number}
 */
Timer.REQUEST_ANIMATION_FRAME = -0x1024;
Timer.prototype = forge(EventDispatcher.prototype, {
    constructor: Timer,

    _delay: undefined,
    _repeatCount: 0,
    _currentCount: 0,

    _intervalId: undefined,
    _setIntervalHandler: function () {
        this._run();
    },

    _requestAnimationFrameFlag: false,
    _requestAnimationFrameCount: 0,
    _requestAnimationFrameHandler: function () {
        if (this._requestAnimationFrameCount == 1) this._run();
        if (this._requestAnimationFrameCount < 1) this._requestAnimationFrameCount++;
        if (this._requestAnimationFrameFlag) requestAnimationFrame(this._requestAnimationFrameHandler);
    },

    _run: function () {
        if (this._repeatCount != 0 && this._currentCount >= this._repeatCount) {
            this.stop();
            this.fire({type: "timerComplete"});
            return;
        }
        this._currentCount++;
        this.fire({type: "timer"});
    },

    delay: function (value) {
        if (arguments.length == 0) return this._delay;
        if (this._delay == value) return;
        if (isNaN(value) || !isFinite(value) || (value <= 0 && value != Timer.REQUEST_ANIMATION_FRAME))
            throw new Error("Illegal delay value: " + value);
        this._delay = value;
        if (this.running()) {
            this.stop();
            this.start();
        }
        return this;
    },
    repeatCount: function (value) {
        if (arguments.length == 0) return this._repeatCount;
        if (this._repeatCount == value) return;
        if (isNaN(value) || !isFinite(value) || value < 0)
            throw new Error("Illegal repeat count value: " + value);
        this._repeatCount = value;
        return this;
    },
    currentCount: function () {
        return this._currentCount;
    },
    running: function () {
        return typeof this._intervalId === "number" || this._requestAnimationFrameFlag;
    },
    reset: function () {
        this.stop();
        this._currentCount = 0;
    },
    start: function () {
        if (this.running()) return;
        if (this._delay == Timer.REQUEST_ANIMATION_FRAME && typeof requestAnimationFrame === "function") {
            this._requestAnimationFrameFlag = true;
            requestAnimationFrame(this._requestAnimationFrameHandler);
        } else if (this._delay > 0) {
            this._intervalId = setInterval(this._setIntervalHandler, this._delay);
        }
    },
    stop: function () {
        if (!this.running()) return;
        clearInterval(this._intervalId);
        this._intervalId = null;
        this._requestAnimationFrameFlag = false;
        this._requestAnimationFrameCount = 0;
    }
});

module.exports = Timer;