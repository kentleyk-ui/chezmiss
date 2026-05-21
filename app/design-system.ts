export const theme = {
  colors: {
    gold: "#B79A5B",
    goldRgb: "183,154,91",
    pink: "#f0c9e1",
    pinkRgb: "240,201,225",
    bg1: "#080508",
    bg2: "#040204",
    bg3: "#020102",
    text: "#f8edf3",
    textPink: "#f0c9e1",
  },

  gradients: {
    liquidMetal: `
      background: linear-gradient(135deg, rgba(183,154,91,0.6), rgba(183,154,91,0.3));
      box-shadow: 0 0 16px rgba(183,154,91,0.5), 0 0 36px rgba(183,154,91,0.20);
      border: 1.5px solid rgba(183,154,91,0.95);
      border-radius: 100px;
      padding: 10px 24px;
      color: #f5dce9;
      font-weight: 600;
    `,
    bg: `radial-gradient(ellipse 80% 40% at 50% -10%, rgba(240,201,225,0.10), transparent),
      radial-gradient(ellipse 60% 50% at 85% 15%, rgba(183,154,91,0.07), transparent),
      linear-gradient(180deg, #080508 0%, #040204 50%, #020102 100%)`,
  },

  text: {
    title: "text-4xl font-bold tracking-tight",
    subtitle: "text-xl opacity-80",
    body: "text-base opacity-90",
  },

  // Touch target minimums (44px recommended for mobile)
  touch: {
    min: "min-h-[44px] min-w-[44px]",
    icon: "w-11 h-11",
  },
}
