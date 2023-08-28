import React from 'react';
import ContentLoader from 'react-content-loader';

const ElementSkeleton = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={600}
    viewBox="0 0 500 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="20" y="20" rx="0" ry="0" width="480" height="580" />
  </ContentLoader>
);

export default ElementSkeleton;
