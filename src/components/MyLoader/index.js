import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={1030}
    viewBox="0 0 500 1030"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >

    <rect x="0" y="20" rx="5" ry="5" width="500" height="183" />
    <rect x="0" y="223" rx="5" ry="5" width="500" height="183" />
    <rect x="0" y="424" rx="5" ry="5" width="500" height="183" />
    <rect x="0" y="629" rx="5" ry="5" width="500" height="183" />
    <rect x="0" y="832" rx="5" ry="5" width="500" height="183" />
  </ContentLoader>
)

export default MyLoader;