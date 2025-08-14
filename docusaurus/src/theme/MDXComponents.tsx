import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import CardsModule from '../components/Cards';

const { Cards, Card } = CardsModule as unknown as {
  Cards: React.ComponentType<any>;
  Card: React.ComponentType<any>;
};

export default {
  ...MDXComponents,
  Cards,
  Card,
};


