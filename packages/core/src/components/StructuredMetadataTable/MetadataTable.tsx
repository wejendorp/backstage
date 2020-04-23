/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  TableCellProps,
} from '@material-ui/core';
import { BackstageTheme } from '@backstage/theme';

const useContentCellStyles = makeStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.6)',
    border: '0',
    verticalAlign: 'top',
  },
});
const useTitleCellStyles = makeStyles<BackstageTheme>(theme => ({
  root: {
    fontWeight: 'bolder',
    whiteSpace: 'nowrap',
    paddingRight: theme.spacing(4),
    border: '0',
    verticalAlign: 'top',
  },
}));

const TitleCell: FC = () => {
  const classes = useTitleCellStyles();
  return <TableCell className={classes.root} />;
};
const ContentCell: FC = () => {
  const classes = useContentCellStyles();
  return <TableCell className={classes.root} />;
};

type MetadataTableProps = {
  dense: boolean | undefined;
  children: ReactNode;
};

export const MetadataTable: FC<MetadataTableProps> = ({ dense, children }) => {
  console.log('children', children);
  return (
    <Table>
      {!dense && (
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '100%' }} />
        </colgroup>
      )}
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export const MetadataTableItem: FC<TableCellProps> = ({
  title,
  children,
  ...rest
}) => {
  console.log('//', title, children);
  return (
    <TableRow>
      {title && <TitleCell>{title}</TitleCell>}
      <ContentCell colSpan={title ? 1 : 2} {...rest}>
        {children}
      </ContentCell>
    </TableRow>
  );
};

const useStyles = makeStyles<BackstageTheme>(theme => ({
  list: {
    listStyle: 'none',
    margin: theme.spacing(0, 0, -1, 0),
    padding: '0',
  },
  listItem: {
    padding: theme.spacing(0, 0, 1, 0),
  },
}));

type ListStyles = ReturnType<typeof useStyles>;

type MetadataListType = {
  classes: ListStyles;
  children: ReactNode;
};

export const MetadataList: FC<MetadataListType> = ({ children }) => {
  const classes = useStyles();
  return <ul className={classes.list}>{children}</ul>;
};

export const MetadataListItem: FC = ({ children }) => {
  const classes = useStyles();
  return <li className={classes.listItem}>{children}</li>;
};
