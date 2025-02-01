export default async function ({ feature }) {
  const locationElement = await ScratchTools.waitForElement(
    "p.profile-details > span.location"
  );

  if (!locationElement) return;

  const countryName = locationElement.childNodes[0]?.nodeValue?.trim();
  if (!countryName) return;

  const countryFlag = getCountryFlag(countryName);
  if (!countryFlag) return;

  const imgElement = new Image();
  imgElement.src = countryFlag;

  ScratchTools.appendToSharedSpace({
    space: "afterProfileCountry",
    element: imgElement,
    order: -1,
  });

  feature.self.hideOnDisable(locationElement);

  function getCountryFlag(countryName) {
    const GithubUrl =
      "https://raw.githubusercontent.com/STForScratch/data/main/flags/";
    return (
      GithubUrl +
      countryName
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(",", "")
        .replaceAll(".", "") +
      ".svg"
    );
  }
}
