const key = "QuTGtA6dNBSqL8ClHWRgsZvGNHwZWGogbpBzE4r3";

const getPotd = async () => {
  const base = "https://api.nasa.gov/planetary/apod";
  const query = `?api_key=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;
};

const getPersPhotosSol = async (sol) => {
  const base =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos";
  const query = `?sol=${sol}&api_key=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

const getPersPhotosEarth = async (date) => {
  const base =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos";
  const query = `?earth_date=${date}&api_key=${key}`;
  const response = await fetch(base + query);
  console.log(base + query);
  const data = await response.json();
  console.log(data);
  return data;
};
