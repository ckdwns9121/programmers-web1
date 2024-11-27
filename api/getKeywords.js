const getKeywords = async (keyword) => {
  const url = `https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${keyword}`;
  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((e) => console.error(e));
  return res;
};

export default getKeywords;
