import { VirtualScroll } from "@michvh-dev/virtual-scroll";
interface ScrollElement {
    target: HTMLElement;
    id?: string;
    startScroll: number;
    start: number;
    end: number;
    hasScroll: boolean;
}
interface ScrollBehaviorConfig {
    elements?: Element[];
    elementSelector?: string;
}
declare class Scroll {
    elements?: Element[];
    elementSelector?: string;
    targetElements: Element[];
    scrollElements: ScrollElement[];
    currentScroll: number;
    maxScrollY: number;
    virtualscroll: VirtualScroll;
    constructor({ elements, elementSelector }: ScrollBehaviorConfig);
    setTargets(): void;
    setScrollPosition(): void;
    setCurrentScrollPosition(position: number, save?: boolean): void;
    goToSectionId(id: string): void;
    reset(): void;
    calculateScollElements(): void;
    initVirtualScroll(): void;
    addEventListeners(): void;
}
export default Scroll;
