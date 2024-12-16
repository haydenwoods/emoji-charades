import { animate, stagger } from "motion";

type ShakeOptions = {
  direction: "x" | "y";
  startDirection: 1 | -1;
  distance: number;
  repetitions: number;
  repetitionDuration: number;
  attenuation: number;
};

type Element = Parameters<typeof animate>[1];

const DEFAULT_OPTIONS: ShakeOptions = {
  direction: "x",
  startDirection: 1,
  distance: 4,
  repetitions: 4,
  repetitionDuration: 0.2,
  attenuation: 0.25,
};

export const animateShake = (
  element: Element,
  options: Partial<ShakeOptions> = DEFAULT_OPTIONS,
) => {
  const { direction, startDirection, distance, repetitions, repetitionDuration, attenuation } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const shakeValues = new Array(repetitions)
    .fill("")
    .map((_, index) => {
      const attenuationPercentage = Math.pow(1 - attenuation, index);
      const attenuatedDistance = distance * attenuationPercentage;
      const repetition = [
        attenuatedDistance * startDirection,
        attenuatedDistance * -startDirection,
      ];
      return repetition;
    })
    .flat();
  const values = [0, ...shakeValues, 0];

  const duration = repetitionDuration * repetitions;

  animate(
    element,
    {
      [direction]: values,
    },
    {
      duration,
    },
  );
};

export const animatePop = (
  element: string | Element | Element[],
  direction: "in" | "out" = "in",
  staggered: boolean = false,
) => {
  const scale = [0.5, 1];
  const opacity = [0, 1];

  if (direction === "out") {
    scale.reverse();
    opacity.reverse();
  }

  animate(
    element,
    {
      scale,
      opacity,
    },
    {
      type: "spring",
      duration: 0.5,
      delay: staggered ? stagger(0.1, { startDelay: 0.2 }) : undefined,
    },
  );
};
