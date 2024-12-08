import { animate } from "motion";

type ShakeOptions = {
  direction: "x" | "y";
  startDirection: 1 | -1;
  distance: number;
  repetitions: number;
  durationPerRepetition: number;
};

type Element = Parameters<typeof animate>[1];

const DEFAULT_OPTIONS: ShakeOptions = {
  direction: "x",
  startDirection: 1,
  distance: 4,
  repetitions: 4,
  durationPerRepetition: 0.2,
};

export const animateShake = (
  element: Element,
  options: Partial<ShakeOptions> = DEFAULT_OPTIONS,
) => {
  const { direction, startDirection, distance, repetitions, durationPerRepetition } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const shakeValues = new Array(repetitions)
    .fill([distance * startDirection, distance * -startDirection])
    .flat();
  const values = [0, ...shakeValues, 0];

  const duration = durationPerRepetition * repetitions;

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

export const animatePopIn = (element: Element) => {
  animate(
    element,
    {
      scale: [0.6, 1],
      opacity: [0, 1],
    },
    { duration: 0.5, type: "spring" },
  );
};
