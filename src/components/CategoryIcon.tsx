import { FC, cloneElement } from 'react';
import { ICONS_MAP } from '../utils';
import AcUnitIcon from '@mui/icons-material/AcUnit';

type CategoryIconProps = {
  iconType: string;
  color?: string;
  sx?: any;
};

export const CategoryIcon: FC<CategoryIconProps> = ({ iconType, color, sx }) => {
  const findIcon = ICONS_MAP.find((icon) => icon.value === iconType);

  if (!findIcon) {
    return <AcUnitIcon sx={{ color }} />;
  }

  return cloneElement(findIcon.component, {
    sx: {
      ...sx,
      color,
    },
  });
};
