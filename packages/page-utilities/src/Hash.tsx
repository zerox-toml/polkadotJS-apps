// Copyright 2017-2025 @polkadot/app-utilities authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import { Input, Output, Static } from '@polkadot/react-components';
import { hexToU8a, isHex, stringToU8a, u8aToHex } from '@polkadot/util';
import { sha256AsU8a } from '@polkadot/util-crypto';

import { useTranslation } from './translate.js';

interface Props {
  className?: string;
}

interface State {
  data: string;
  hash: string;
  isHexData: boolean;
}

function Hash ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [{ data, hash, isHexData }, setState] = useState<State>({
    data: '',
    hash: u8aToHex(sha256AsU8a(stringToU8a(''))),
    isHexData: false
  });

  const _onChangeData = useCallback(
    (data: string): void => {
      const isHexData = isHex(data);

      setState({
        data,
        hash: u8aToHex(sha256AsU8a(
          isHexData
            ? hexToU8a(data)
            : stringToU8a(data)
        )),
        isHexData
      });
    },
    []
  );

  return (
    <div className={className}>
      <div className='ui--row'>
        <Input
          autoFocus
          className='full'
          label={t('from the following data')}
          onChange={_onChangeData}
          value={data}
        />
      </div>
      <div className='ui--row'>
        <Static
          className='medium'
          label={t('hex input data')}
          value={
            isHexData
              ? t('Yes')
              : t('No')
          }
        />
      </div>
      <div className='ui--row'>
        <Output
          className='full'
          isHidden={hash.length === 0}
          isMonospace
          label={t('the resulting hash is')}
          value={hash}
          withCopy
        />
      </div>
    </div>
  );
}

export default React.memo(Hash);
