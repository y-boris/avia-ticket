import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >

    <rect x="0" y="0" rx="5" ry="5" width="500" height="185" />




  </ContentLoader>
)

export default MyLoader;