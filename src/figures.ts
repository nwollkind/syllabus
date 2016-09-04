/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

class Figure {
    name: string;
    timeline: Step[];
    constructor(name: string, timeline: Step[]) {
        this.name = name;
        this.timeline = timeline;
    }
}

enum Foot { Left, Right }
let LF = Foot.Left;
let RF = Foot.Right;

enum Placement { Backward, Forward, ToSide, Closes }
let back = Placement.Backward;
let fwd = Placement.Forward;
let toSide = Placement.ToSide;
let closes = Placement.Closes;

enum AlignmentType { Normal, Pointing }
let pointing = AlignmentType.Pointing

class Step {
    time: number;
    foot: Foot;
    placement: Placement;
    alignmentType: AlignmentType;
    direction: number;
    constructor(time: number, foot: Foot, placement: Placement, direction: number, alignmentType: AlignmentType = AlignmentType.Normal) {
        this.time = time;
        this.foot = foot;
        this.placement = placement;
        this.alignmentType = alignmentType;
        this.direction = direction;
    }
}

export let waltz = [
    new Figure("Natural turn forward", [
        new Step(1, RF, fwd,    0),
        new Step(2, LF, toSide, 90),
        new Step(3, RF, closes, 45),
    ]),
    new Figure("Natural turn backward", [
        new Step(1, LF, back,   0),
        new Step(2, RF, toSide, 135, pointing),
        new Step(3, LF, closes, 0),
    ]),
    new Figure("Reverse turn forward", [
        new Step(1, LF, fwd,    0),
        new Step(2, RF, toSide, 90),
        new Step(3, LF, closes, 45),
    ]),
    new Figure("Reverse turn backward", [
        new Step(1, RF, back,    0),
        new Step(2, LF, toSide, 135, pointing),
        new Step(3, RF, closes, 0),
    ]),
];