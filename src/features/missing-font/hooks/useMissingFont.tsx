const isFontInstalled = (fontName: string) => {
  const testString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const span = document.createElement("span");
  span.style.fontSize = "72px";
  span.style.display = "inline-block";
  span.textContent = testString;

  // Appliquer une police générique (sans-serif) pour le contrôle
  span.style.fontFamily = "monospace";
  document.body.appendChild(span);
  const defaultWidth = span.offsetWidth;

  // Maintenant, appliquez la police que vous voulez tester
  span.style.fontFamily = `${fontName}, monospace`;
  const testWidth = span.offsetWidth;

  document.body.removeChild(span);

  return defaultWidth !== testWidth;
};

export const useMissingFont = () => {
  return {
    showAlertMissingFont: !isFontInstalled("BentoenSansF"),
  };
};
