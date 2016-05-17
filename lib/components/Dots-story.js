import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Dots from './Dots'

storiesOf('Dots', module)
  .add('empty', () => <Dots />)
  .add('3 filled', () => <Dots level={ 3 } />)
  .add('more than 5', () => <Dots level={ 7 } max={ 12 } />)
