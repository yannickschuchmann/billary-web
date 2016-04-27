import * as MUIColors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';
import * as Colors from './colors';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.orangeA,
    primary2Color: Colors.tealA,
    primary3Color: MUIColors.lightBlack,
    accent1Color: Colors.orangeA,
    accent2Color: MUIColors.grey100,
    accent3Color: MUIColors.grey500,
    textColor: Colors.blueGrey900,
    alternateTextColor: MUIColors.white,
    canvasColor: MUIColors.white,
    borderColor: MUIColors.grey300,
    disabledColor: ColorManipulator.fade(MUIColors.darkBlack, 0.3),
    pickerHeaderColor: Colors.tealA,
  }
};
