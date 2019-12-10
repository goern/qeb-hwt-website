import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextVariants,
  TextContent,
  Text
} from '@patternfly/react-core';

import { ThamosAdvise } from '@app/ThamosAdvise/ThamosAdvise';

const Dashboard: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Qeb-Hwt</Text>
        <Text component={TextVariants.p}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quaerat, ipsa quod atque natus eius omnis amet nisi aperiam impedit corrupti fugit itaque reprehenderit dolor nulla. Dolor voluptatum quasi ex.
      </Text>
      </TextContent>
      <PageSection>
        <ThamosAdvise></ThamosAdvise>
      </PageSection>
      <PageSection>
        <TextContent>
          <Text component={TextVariants.p}>
            Qeb-Hwt website: git commit hash: {COMMITHASH}, version: {VERSION}
          </Text>
        </TextContent>
      </PageSection>
    </PageSection>
  </React.Fragment>
)

export { Dashboard };
