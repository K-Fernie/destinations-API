function filterObj({ destinationsDB: obj, city: filterValue }) {
  const filtered = {};

  for (const prop in obj) {
    if (obj[prop].location.toLowerCase() === filterValue.toLowerCase()) {
      filtered[prop] = obj[prop];
    }
  }

  return filtered;
}

export function filterDestinations({ city, destinationsDB, res }) {
  if (city) {
    const filtered = filterObj({ destinationsDB, city });
    res.send(filtered);
  } else {
    res.send(destinationsDB);
  }
}
