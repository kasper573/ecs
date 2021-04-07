import { Tooltip, TooltipProps } from "@material-ui/core";
import { Intro, IntroProps } from "./Intro";

export type IntroWithDefaultTooltipProps = Omit<IntroProps, "children"> & {
  defaultTooltip: Omit<TooltipProps, "children">;
  children: JSX.Element;
};

/**
 * Avoids material-ui warning about nested tooltips
 */
export const IntroWithDefaultTooltip = ({
  defaultTooltip,
  children,
  ...introProps
}: IntroWithDefaultTooltipProps) => (
  <Intro {...introProps}>
    {({ isIntroVisible }) =>
      isIntroVisible ? (
        children
      ) : (
        <Tooltip {...defaultTooltip}>{children}</Tooltip>
      )
    }
  </Intro>
);
