const settings = {
    possiblePoints: {
      name: "Possible Points",
      value: true,
      defaultValue: true,
      descriptions: "Show possible points for each category on the scorecard.",
      toggleId: "toggle-possible-points",
      toggleAction: function() {
        settings.possiblePoints.value = !settings.possiblePoints.value;  // Toggle value
        document.querySelectorAll(".possiblePoints").forEach((el) => 
          el.classList.toggle("hidden", !settings.possiblePoints.value)
        );
        document.getElementById(settings.possiblePoints.toggleId).classList.toggle("active", settings.possiblePoints.value);
      }
    },
    darkMode: {
      name: "Dark Mode",
      defaultValue: false,
      value: false,
      descriptions: "Toggles Dark Mode Colors",
      toggleId: "toggle-dark-mode",
      toggleAction: function() {
        settings.darkMode.value = !settings.darkMode.value;  // Toggle value
        document.querySelectorAll('*').forEach((el) => 
          el.classList.toggle("dark", settings.darkMode.value)
        );
        document.getElementById(settings.darkMode.toggleId).classList.toggle("active", settings.darkMode.value);
      },
    },
  };

  export default settings;