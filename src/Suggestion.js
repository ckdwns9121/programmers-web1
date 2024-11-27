export default function Suggestion({ $target, initState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    items: initState,
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState,
    };
    localStorage.setItem("suggestion", JSON.stringify(this.state));
    this.render();
  };

  this.render = () => {
    const { items = [], selectedIndex } = this.state;
    if (items.length > 0) {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
            <ul>
                ${items
                  .map(
                    (item, index) => `
                <li data-index="${index}" class="${
                      index === selectedIndex ? "Suggestion__item--selected" : ""
                    }">${item}</li>
                `
                  )
                  .join("")}
            </ul>
            `;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };
  this.render();

  window.addEventListener("keyup", (e) => {
    const { items, selectedIndex } = this.state;
    if (items.length > 0) {
      const lastIndex = items.length - 1;
      const navigateionKeys = ["ArrowUp", "ArrowDown", "Enter"];
      let nextIndex = selectedIndex;
      if (navigateionKeys.includes(e.key)) {
        if (e.key === "ArrowUp") {
          nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
        } else if (e.key === "ArrowDown") {
          nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
        } else if (e.key === "Enter") {
          onSelect(items[selectedIndex]);
        }
      }
      this.setState({
        ...this.state,
        selectedIndex: nextIndex,
      });
    }
  });
  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { index } = $li.dataset;
      try {
        onSelect(this.state.items[parseInt(index)]);
      } catch (e) {
        console.error(e);
        alert("error");
      }
    }
  });
}
