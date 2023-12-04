export function generate_uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const uuid = (Math.random() * 16) | 0,
      v = c == 'x' ? uuid : (uuid & 0x3) | 0x8;

    return uuid.toString(16);
  });
}
