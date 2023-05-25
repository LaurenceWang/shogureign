function toUnicode(kanji) {
  return kanji.charCodeAt(0).toString(16).toLowerCase();
}

function getSVG(kanji) {
  return "https://raw.githubusercontent.com/KanjiVG/kanjivg/9a74647714cbb2ee9492deae18dbc2599535c96b/kanji/0" + toUnicode(kanji) + ".svg"
}

export { getSVG };
