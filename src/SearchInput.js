export default function SearchInput({ $target, initState, onChange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initState;
  $target.appendChild(this.$element);

  this.init = () => {
    const state = localStorage.getItem("keyword");
    if (state) {
      this.state = state;
      onChange(state);
    }
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">
      `;
  };

  this.$element.addEventListener("keyup", (e) => {
    const actionIgnoreKeys = ["Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!actionIgnoreKeys.includes(e.key)) {
      onChange(e.target.value);
    }
  });
  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this.init();
}
