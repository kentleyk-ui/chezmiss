const sharp = require("sharp");

// Chemin de ton image d'origine
const input = "public/logo-black.png";

// Chemin du fichier exporté
const output = "public/logo-chezmiss-enhanced.png";

async function processImage() {
  try {
    const image = sharp(input);

    // === CROP A : TEXTE + SYMBOLE + LIGNES ===
    const crop = {
      left: 80,
      top: 350,
      width: 800,
      height: 580
    };

    await image
      .extract(crop)
      .resize(crop.width * 2)
      .modulate({
        brightness: 1.2,
        contrast: 1.2,
      })
      .sharpen()
      .toFile(output);

    console.log("✔ Version A exportée :", output);
  } catch (err) {
    console.error("❌ Erreur :", err);
  }
}

processImage();
