import React from 'react';
import ContentLoader from 'react-content-loader';

const ItemSkeleton = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={600}
    viewBox="0 0 500 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="20" y="20" rx="0" ry="0" width="460" height="460" />
    <rect x="100" y="490" rx="10" ry="10" width="300" height="60" />
    <rect x="200" y="560" rx="10" ry="10" width="100" height="40" />
  </ContentLoader>
);

export default ItemSkeleton;
