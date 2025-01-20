export const getColorByType = (type: number) => {
  switch (type) {
    case 0:
      return '#FF4842';
    case 1:
      return '#008c7e';
    default:
      return 'inherit';
  }
};
