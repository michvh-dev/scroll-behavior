import { VirtualScroll } from "@michvh-dev/virtual-scroll";
import { easeInQuad } from "./utils/ease";
class Scroll {
    constructor({ elements, elementSelector }) {
        this.targetElements = [];
        this.scrollElements = [];
        this.currentScroll = 0;
        this.maxScrollY = 0;
        if (!elements && !elementSelector) {
            throw new Error("one of these: elements, elementSelector is required");
        }
        this.elements = elements;
        this.elementSelector = elementSelector;
        this.setTargets();
        this.calculateScollElements();
        this.initVirtualScroll();
        this.addEventListeners();
    }
    setTargets() {
        const { elements, elementSelector } = this;
        if (elements) {
            this.targetElements = elements;
        }
        else if (elementSelector) {
            this.targetElements = [...document.querySelectorAll(elementSelector)];
        }
        else {
            throw Error("dsfdsfs");
        }
    }
    setScrollPosition() {
        this.scrollElements.forEach((el, index) => {
            if (el.start <= this.currentScroll && !el.hasScroll) {
                el.target.style.transform = "translateY(0)";
            }
            else if (el.start <= this.currentScroll && el.hasScroll) {
                const translate = -((this.currentScroll > el.end ? el.end : this.currentScroll) - el.start);
                el.target.style.transform = `translateY(${translate}px)`;
                console.log(translate);
            }
            else if (el.startScroll < this.currentScroll &&
                el.start > this.currentScroll) {
                var translate = el.start - this.currentScroll;
                el.target.style.transform = "translateY(" + translate + "px)";
                el.target.scrollTop = 0;
            }
            else {
                el.target.style.transform = "translateY(" + window.innerHeight + "px)";
            }
        });
    }
    setCurrentScrollPosition(position, save = true) {
        if (position < 0) {
            position = 0;
        }
        if (position > this.maxScrollY) {
            position = this.maxScrollY;
        }
        this.currentScroll = position;
        if (save) {
            localStorage.setItem("home.currentScroll", `${this.currentScroll}`);
        }
        this.setScrollPosition();
    }
    goToSectionId(id) {
        var anchor = id.split("#")[1];
        var element = this.scrollElements.find((el) => {
            return el.id === anchor;
        });
        if (!element) {
            return;
        }
        var diffScroll = element.start - this.currentScroll;
        var time = 0;
        var totalTime = Math.abs(diffScroll) > 1000 ? 400 : 200;
        for (var i = 1; i < 61; i++) {
            setTimeout(() => {
                var scroll = this.currentScroll + diffScroll / 60;
                this.setCurrentScrollPosition(scroll);
            }, time);
            time = easeInQuad(i, 0, totalTime, 60);
        }
    }
    reset() {
        this.scrollElements.forEach((element) => {
            element.target.style.transform = "";
            element.target.style.position = "";
            element.target.style.width = "";
            element.target.style.left = "";
            element.target.style.top = "";
            element.target.style.zIndex = "";
        });
        this.scrollElements = [];
    }
    calculateScollElements() {
        this.maxScrollY = 0;
        var scrollCheck = 0;
        for (var i = 0; i < this.targetElements.length; i++) {
            var element = this.targetElements[i];
            var scrollPositionStart = scrollCheck;
            var scrollPositionEnd = scrollPositionStart + element.scrollHeight - window.innerHeight;
            this.maxScrollY = scrollPositionEnd;
            scrollCheck = scrollPositionStart + element.scrollHeight;
            const object = {
                target: element,
                id: element.id,
                startScroll: scrollPositionStart > 0 ? this.scrollElements[i - 1].end : 0,
                start: scrollPositionStart,
                hasScroll: element.scrollHeight !== window.innerHeight,
                end: scrollPositionEnd,
            };
            console.log(object);
            object.target.style.position = "fixed";
            object.target.style.width = "100%";
            object.target.style.left = "0px";
            object.target.style.top = "0px";
            object.target.style.zIndex = `${i + 1}`;
            this.scrollElements.push(object);
        }
        this.setCurrentScrollPosition(this.currentScroll);
    }
    initVirtualScroll() {
        this.virtualscroll = new VirtualScroll({
            horizontal: false,
            vertical: true,
            keyboardOffset: 50,
            boundaries: {
                minX: 0,
                minY: 0,
                maxX: window.innerHeight,
                maxY: this.maxScrollY,
            },
        });
        this.virtualscroll.on("scroll", (p) => {
            this.setCurrentScrollPosition(p.currentY);
        });
    }
    addEventListeners() {
        window.addEventListener("resize", () => {
            this.reset();
            this.calculateScollElements();
        });
    }
}
export default Scroll;
