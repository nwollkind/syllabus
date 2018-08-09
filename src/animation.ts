type Animation<T> = (time: number) => T;

interface AnimationRule<T> {
    denotation(): Animation<T>;
}

interface KeyFrame<T> {
    time: number;
    interpolate(time: number, next: this): T;
    extrapolate(time: number): T;
}

class StepKeyFrame<T> implements KeyFrame<T> {
    time: number;
    value: T;
    interpolate(time: number, next: this): T {
        return this.value;
    }
    extrapolate(time: number) {
        return this.value;
    }
}

class LinearKeyFrame ...

class LinearlyInterpolatedFunction extends AnimationRule<number> {
    interpolate(time: number, left: Point<number>, right: Point<number>): number {
        return left.value + ((right.value - left.value) * ((time - left.time) / (right.time - left.time)));
    }
}

class KeyFrameAnimation<T, KeyFrameT extends KeyFrame<T>> implements AnimationRule<T> {
    keyFrames: KeyFrameT[];
    denotation(): Animation<T> {
        let sorted = this.keyFrames.sort((a, b) => a.time - b.time);
        return (time: number) => {
            let first = 0;
            let last = sorted.length;
            let count = last;
            while (count > 0)
            {
                let step = count / 2;
                let i = first + step;
                if (time >= sorted[i].time) {
                    first = i + 1;
                    count -= step+1;
                } else {
                    count = step;
                }
            }
            let upperBound = first;
            if (upperBound == 0)
                return sorted[0].extrapolate(time);
            else if (upperBound == sorted.length)
                return sorted[sorted.length - 1].extrapolate(time);
            else
                return sorted[upperBound - 1].interpolate(time, sorted[upperBound]);
        };
    }
}
