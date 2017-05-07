function ClozeCard(text, clozeDeletion) {

  // This code allows us to optionally create ClozeCards without using the new keyword
  if (!(this instanceof ClozeCard)) {
    return new ClozeCard(text, clozeDeletion);
  }

  // saves the positions for clozeDeletion.
  var clozePostions = clozeDelete(text, clozeDeletion);

  // puts together partial cards
  this.partial = getPartial(text, clozePostions);

  // Saves the cloze deleted text
  this.cloze = text.slice(clozePostions[0], clozePostions[1]);

  function getPartial(text, clozePostions) {

    var start = text.slice(0, clozePostions[0]);
    var end = text.slice(clozePostions[1], text.length);

    // Return
    return start + "..." + end;
  }

  function clozeDelete(text, clozeDeletion) {
    var start = text.indexOf(clozeDeletion);
    if (start !== -1) {
      return [start, start + clozeDeletion.length];
    }
    throw new Error("Cloze deletion not found in input text.");
  }
}

ClozeCard.prototype.displayCard = function displayCard() {
  return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
};

module.exports = ClozeCard;
