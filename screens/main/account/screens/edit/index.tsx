import {Divider, Text} from '@ui-kitten/components';
import {Box, HStack, Select, VStack} from 'native-base';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Camera from './assets/camera.svg';

import {COVER} from '../../../../dummy.data';
import IconButton from '../../../../../shared/components/IconButton';

export default function EditProfile() {
  return (
    <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
      <VStack space={8}>
        <Box px={4} py={8} alignItems="center">
          <View>
            <Image source={COVER} style={avatar.img} />

            <Box
              bg="#fff"
              right={-5}
              bottom={-5}
              borderRadius={100}
              position="absolute">
              <IconButton size="small" icon={Camera} />
            </Box>
          </View>
        </Box>

        <VStack divider={<Divider />}>
          <HStack py={3} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Full name
            </Text>

            <TextInput style={styles.input} defaultValue="Jane Andrews" />
          </HStack>

          <HStack py={3} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Username
            </Text>

            <TextInput style={styles.input} defaultValue="@jane12" />
          </HStack>

          <HStack py={3} space={4}>
            <Text category="p1" style={styles.label}>
              About
            </Text>

            <TextInput
              multiline
              style={styles.input}
              defaultValue="Just here to read great stories and connect with amazing people"
            />
          </HStack>

          <HStack py={2} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Gender
            </Text>

            <Box w="3/4" maxW="100%">
              <Select
                // minWidth="200"
                fontSize={15}
                borderWidth={0}
                placeholder="Set">
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
              </Select>
            </Box>
          </HStack>

          <HStack py={2} space={4} alignItems="center">
            <Text category="p1" style={styles.label}>
              Location
            </Text>

            <Box w="3/4" maxW="100%">
              <Select
                // minWidth="200"
                fontSize={15}
                borderWidth={0}
                placeholder="Set">
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
              </Select>
            </Box>
          </HStack>

          <Divider />
        </VStack>

        <Box alignItems="center">
          <TouchableOpacity style={styles.btn}>
            <Text category="p1">Save changes</Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h: {
    alignItems: 'center',
  },
  label: {
    color: '#6B6B6B',
  },
  input: {
    flex: 1,
    padding: 0,
  },
  btn: {
    minWidth: '40%',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#EFFBF9',
  },
});

const avatar = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
