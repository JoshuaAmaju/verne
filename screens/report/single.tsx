import {useNavigation, useRoute} from '@react-navigation/native';
import {Input, Text} from '@ui-kitten/components';
import {Box, HStack} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import Button from '../../shared/components/Button';
import Screen from '../../shared/components/Screen';
import {ReportTypes} from '../dummy.data';

export default function SingleReport() {
  const nav = useNavigation();
  const {params = {} as any} = useRoute();

  const {id, type} = params;

  const report = ReportTypes.find(t => t.type === type);

  return (
    <Screen style={{padding: 24, justifyContent: 'space-between'}}>
      <View>
        <Text category="h2">{report?.label}</Text>

        <Box mt={6}>
          <Text>{report?.description}</Text>

          {report?.policy &&
            report.policy.map(p => (
              <HStack mt={3} space={2} alignItems="center">
                <Box w={2} h={2} bg="#858585" borderRadius={100} />
                <Text>{p}</Text>
              </HStack>
            ))}

          {(report?.type === 4 || report?.type === 5) && (
            <Box mt={8}>
              <Input
                multiline
                style={{borderRadius: 8}}
                placeholder="Type here..."
                textStyle={{paddingBottom: 100, paddingTop: 10}}
              />
            </Box>
          )}
        </Box>
      </View>

      <Button>Submit</Button>
    </Screen>
  );
}
