const initTheme = `dark`;

const initBodyTheme = (theme) => {
  let currentBodyTheme = theme;
  const themes = [`dark`, `purple`, `blue`, `light-blue`];

  const applyTheme = (newTheme = currentBodyTheme) => {
    if (themes.includes(newTheme)) {
      document.body.classList.remove(...themes);
      document.body.classList.add(newTheme);
    }
  };

  const setAndApplyBodyTheme = (newTheme) => {
    if (themes.includes(newTheme)) {
      currentBodyTheme = newTheme;
      applyTheme();
    }
  };

  const clearBodyTheme = () => {
    applyTheme(initTheme);
  };

  return {
    currentBodyTheme,
    applyTheme,
    setAndApplyBodyTheme,
    clearBodyTheme,
  };
};

const bodyTheme = initBodyTheme(initTheme);

export default bodyTheme;
