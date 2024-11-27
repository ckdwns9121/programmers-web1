import SearchInput from "./SearchInput.js";
import getKeywords from "../api/getKeywords.js";
import Suggestion from "./Suggestion.js";
import SelectedList from "./SelectedList.js";

export default function App({ $target }) {
  const initSelected = JSON.parse(localStorage.getItem("selectedList"));

  // 초기 상태 선언
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: initSelected ? initSelected : [],
  };
  // 상태 변경
  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState,
    };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });

    selectedList.setState(this.state.selectedLanguages);
  };

  // 선택 컴포넌트 생성
  const selectedList = new SelectedList({ $target, initState: [] });

  // 인풋 컴포넌트 생성
  const searchInput = new SearchInput({
    $target,
    initState: "",
    onChange: async (keyword) => {
      localStorage.setItem("keyword", keyword);
      // 디바운싱
      let timer = null;
      if (timer) {
        clearTimeout(timer);
      } else {
        timer = setTimeout(async () => {
          if (keyword.length === 0) {
            this.setState({
              fetchedLanguages: [],
            });
          } else {
            const laguage = await getKeywords(keyword);
            this.setState({
              fetchedLanguages: laguage,
            });
          }
        }, 300);
      }
    },
  });

  // 키워드 리스트 생성
  const suggestion = new Suggestion({
    $target,
    initState: [],
    onSelect: (language) => {
      alert(language);
      const MAX_COUNT = 5;
      const nextSelectedLagnuages = [...this.state.selectedLanguages];
      const index = nextSelectedLagnuages.findIndex((item) => item === language);
      if (index > -1) {
        nextSelectedLagnuages.splice(index, 1);
      }
      if (nextSelectedLagnuages.length === MAX_COUNT) {
        nextSelectedLagnuages.shift();
      }

      nextSelectedLagnuages.push(language);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLagnuages,
      });
    },
  });
}
