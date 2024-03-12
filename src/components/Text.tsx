import {StyleSheet, Text as RnText, View, TextProps} from 'react-native';
import React from 'react';

type Props = {
  children: string;
  color?: string;
  size?: number;
  fontFamily?: string;
} & TextProps;

const Text: React.FC<Props> = ({
  children,
  color,
  size,
  fontFamily,
  ...props
}) => {
  return <RnText {...props}>RnText</RnText>;
};

export default React.memo(Text);
