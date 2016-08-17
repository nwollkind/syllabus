/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

class Figure {
    name: string;
    timeline: Instant[];
    constructor(name: string, timeline: Instant[]) {
        this.name = name;
        this.timeline = timeline;
    }
}

interface Instant {
    time: number;
    facts: Fact[];
}

interface Fact {

}

enum Foot { Left, Right }
enum To { Forward, Backward, Side }

class Step implements Fact {
    foot: Foot;
    to: To;
    constructor(foot: Foot, to: To) {
        this.foot = foot;
        this.to = to;
    }
}

export let waltz = [
    new Figure("Natural turn", [
        { time: 1, facts: [new Step(Foot.Left, To.Backward)] }
    ])
];