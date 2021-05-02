import { MosaicWithoutDragDropContext } from "react-mosaic-component";
import "react-mosaic-component/react-mosaic-component.css";
import styled, { css, CSSObject } from "styled-components";

/**
 * A project specific material-ui themed variant of Mosaic.
 * (Opts out of the embedded DndProvider since we already have one)
 */
export const MuiMosaic: typeof MosaicWithoutDragDropContext = styled(
  MosaicWithoutDragDropContext
)`
  & {
    background: transparent;
    .mosaic-window {
      border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    }
    .mosaic-window-toolbar {
      background: ${({ theme }) => theme.palette.background.paper};
      border-radius: 0;
      box-shadow: none;
    }
    .mosaic-window-title {
      ${({ theme }) => css(theme.typography.caption as CSSObject)}
    }
    .mosaic-window-body {
      background: ${({ theme }) => theme.palette.background.paper};
    }
  }
` as any;
