import React, {type ReactElement} from 'react';
import clsx from 'clsx';
import OriginalTOC from '@theme-original/TOC';
import type {Props} from '@theme/TOC';
import PageActions from '@site/src/components/PageActions';
import styles from './styles.module.css';

export default function TOCWrapper({className, ...props}: Props): ReactElement {
  return (
    <div className={clsx(styles.tocContainer, className)}>
      <OriginalTOC
        {...props}
        className={clsx(className, styles.tocBody)}
      />
      <div className={styles.pageActionsContainer}>
        <PageActions className={styles.pageActions} />
      </div>
    </div>
  );
}

