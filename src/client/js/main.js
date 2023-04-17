import "regenerator-runtime/runtime";
import "../scss/styles.scss";
import MyPage from "./MyPage";
import MyPli from "./MyPli";

if (window.location.pathname === "/") {
  const myPli = new MyPli();
  myPli.init();
}

if (window.location.pathname === "/user/myPage") {
  const myPage = new MyPage();
  myPage.init();
}
