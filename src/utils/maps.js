export function validateMaps(maps = {}) {
  for (const map in maps) {
    const images = maps[map];

    for (const image in images) {
      images[image].path =
        process.env.BASE_URL + "img/maps/" + images[image].path;
      images[image].points = {};
    }
  }

  return maps;
}
