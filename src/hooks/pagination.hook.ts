import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { COUNT_PER_PAGE, COUNT_PER_SECTION } from "src/constant";
import { useUserStore } from "src/stores";

const usePagination = <T>() => {

  const [listItem, setListItem] = useState<T[]>([]);
  const [viewList, setViewList] = useState<T[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);

  const changePage = (List: T[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = List.slice(startIndex, endIndex);
    setViewList(viewList);
  };

  const changeSection = (totalPage: number) => {
    if (!currentSection) return;
    const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
    let endPage = currentSection * COUNT_PER_SECTION;
    if (endPage > totalPage) endPage = totalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setPageList(pageList);
  };

  const changeList = (changeList: T[]) => {
    setListItem(changeList);
    const totalLength = changeList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(changeList, totalLength);

    changeSection(totalPage);
};


  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const onPreSectionClickHandler = () => {
    if (currentSection <= 1 && currentPage <= 1) {
      return;
    }
    if (currentPage === (currentSection - 1) * COUNT_PER_SECTION + 1) {
      if (currentSection > 1) {
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 2) * COUNT_PER_SECTION + COUNT_PER_SECTION);
      }
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextSectionClickHandler = () => {
    if (currentSection >= totalSection && currentPage >= totalPage) {
      return;
    }
    if (currentPage === currentSection * COUNT_PER_SECTION) {
      setCurrentSection(currentSection + 1);
      setCurrentPage((currentSection + 1) * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1));
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (!listItem.length) return;
    changePage(listItem, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!listItem.length) return;
    changeSection(totalPage);
  }, [currentSection]); 

  return {
    viewList,
    pageList,
    totalPage,
    currentPage,
    totalLength,

    setCurrentPage,
    setCurrentSection,
    changeList,

    onPageClickHandler,
    onPreSectionClickHandler,
    onNextSectionClickHandler
  };

};

export default usePagination;