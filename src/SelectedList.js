const MAX_COUNT = 5;
export default function SelectedList({ $target, initState }) {
  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";
  this.state = initState;

  $target.appendChild(this.$element);

  this.init = () => {
    const state = JSON.parse(localStorage.getItem("selectedList"));
    if (state) {
      this.setState(state);
    }
    this.render();
  };

  this.setState = (newState) => {
    this.state = newState;
    if (this.state.length > MAX_COUNT) {
      const start = this.state.length - MAX_COUNT;
      this.state.slice(start, MAX_COUNT + start);
    }
    localStorage.setItem("selectedList", JSON.stringify(this.state));
    this.render();
  };
  this.render = () => {
    this.$element.innerHTML = `
        <ul>
            ${this.state.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        `;
  };
  this.init();
}
